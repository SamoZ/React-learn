import React, { useState, useEffect } from 'react';
import marked from 'marked';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import * as moment from 'moment';

import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';

import '../static/css/addArticle.css';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
	const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
	const [articleTitle, setArticleTitle] = useState(''); //文章标题
	const [articleContent, setArticleContent] = useState(''); //markdown的编辑内容
	const [markdownContent, setMarkdownContent] = useState('预览内容'); //html内容
	const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
	const [introducehtml, setIntroducehtml] = useState('等待编辑'); //简介的html内容
	const [showDate, setShowDate] = useState(); //发布日期
	const [updateDate, setUpdateDate] = useState(); //修改日志的日期
	const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
	const [selectedType, setSelectType] = useState('请选择文章类型'); //选择的文章类别

	useEffect(() => {
		getTypeInfo();
		// 获取文章的 id
		let tempId = props.match.params.id;
		if (tempId) {
			setArticleId(tempId);
			getArticleById(tempId);
		}
	}, []);

	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		pedantic: true,
		sanitize: true,
		tables: true,
		breaks: false,
		smartLists: true,
		smartypants: false
	});

	const changeContent = e => {
		setArticleContent(e.target.value);
		let html = marked(e.target.value);
		setMarkdownContent(html);
	};

	const changeIntroduce = e => {
		setIntroducemd(e.target.value);
		let html = marked(e.target.value);
		setIntroducehtml(html);
	};

	const selectTypeHandler = value => {
		setSelectType(value);
	};

	const saveArticle = () => {
		if (!articleTitle) {
			message.error('文章标题不能为空');
			return false;
		} else if (selectedType === '请选择文章类型') {
			message.error('必须选择文章类型');
			return false;
		} else if (!articleContent) {
			message.error('文章内容不能为空');
			return false;
		} else if (!introducemd) {
			message.error('文章简介不能为空');
			return false;
		} else if (!showDate) {
			message.error('发布日期不能为空');
			return false;
		}
		let dataProps = {};
		dataProps.type_id = selectedType;
		dataProps.title = articleTitle;
		dataProps.article_content = articleContent;
		dataProps.introduce = introducemd;
		let dataText = showDate.replace('-', '/');
		dataProps.addTime = new Date(dataText).getTime() / 1000;

		if (articleId === 0) {
			console.log('articleId=:' + articleId);
			dataProps.view_count = 0;
			axios({
				method: 'POST',
				url: servicePath.addArticle,
				data: dataProps,
				withCredentials: true
			}).then(res => {
				setArticleId(res.data.insertId);
				if (res.data.isSuccess) {
					message.success('文章添加成功');
				} else {
					message.error('文章添加失败');
				}
			});
		} else {
			dataProps.id = articleId;
			axios({
				method: 'POST',
				url: servicePath.updateArticle,
				data: dataProps,
				withCredentials: true
			}).then(res => {
				if (res.data.isSuccess) {
					message.success('文章保存成功');
				} else {
					message.error('文章保存失败');
				}
			});
		}
	};

	const getTypeInfo = () => {
		axios({
			method: 'GET',
			url: servicePath.getTypeInfo,
			withCredentials: true
		}).then(res => {
			console.log('getTypeInfo: ', res);
			if (res.data.data === '未登录') {
				localStorage.removeItem('openId');
				props.history.push('/');
			} else {
				setTypeInfo(res.data.data);
			}
		});
	};

	const getArticleById = id => {
		axios(servicePath.getArticleById + id, {
			withCredentials: true
		}).then(res => {
			console.log('getArticleById: ', res);
			const articleInfo = res.data.data[0];
			setArticleTitle(articleInfo.title);
			setArticleContent(articleInfo.article_content);
			const html = marked(articleInfo.article_content);
			setMarkdownContent(html);
			setIntroducemd(articleInfo.introduce);
			const tempInt = marked(articleInfo.introduce);
			setIntroducehtml(tempInt);
			setShowDate(articleInfo.addTime);
			setSelectType(articleInfo.typeId);
		});
	};

	return (
		<div>
			<Row gutter={10}>
				<Col span={18}>
					<Row gutter={[10, 20]}>
						<Col span={20}>
							<Input
								value={articleTitle}
								placeholder="博客标题"
								size="large"
								onChange={e => {
									setArticleTitle(e.target.value);
								}}
							/>
						</Col>
						<Col span={4}>
							<Select
								defaultValue={selectedType}
								size="large"
								value={selectedType}
								onChange={selectTypeHandler}
							>
								{typeInfo.map((item, index) => {
									return (
										<Option key={index} value={item.Id}>
											{item.typeName}
										</Option>
									);
								})}
							</Select>
						</Col>
					</Row>
					<Row gutter={[10, 20]}>
						<Col span={12}>
							<TextArea
								className="markdown-content"
								rows={35}
								placeholder="文章内容"
								value={articleContent}
								onChange={changeContent}
							/>
						</Col>
						<Col span={12}>
							<div
								className="show-html"
								dangerouslySetInnerHTML={{
									__html: markdownContent
								}}
							></div>
						</Col>
					</Row>
				</Col>
				<Col span={6}>
					<Row gutter={[10, 20]}>
						<Col span={24}>
							<Button size="large">暂存文章</Button>&nbsp;&nbsp;
							<Button
								type="primary"
								size="large"
								onClick={saveArticle}
							>
								发布文章
							</Button>
						</Col>
						<Col span={24}>
							<TextArea
								rows={4}
								placeholder="文章简介"
								value={introducemd}
								onChange={changeIntroduce}
							/>
							<br />
							<br />
							<div
								className="introduce-html"
								dangerouslySetInnerHTML={{
									__html: introducehtml
								}}
							></div>
						</Col>
						<Col span={12}>
							<div className="data-select">
								<DatePicker
									placeholder="发布日期"
									size="large"
									value={moment(showDate)}
									onChange={(data, dataString) => {
										setShowDate(dataString);
									}}
								/>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
}

export default AddArticle;
