import React from 'react';
import axios from 'axios';

import Head from 'next/head';
import marked from 'marked';

import hljs from 'highlight.js';
import Tocify from '../components/tocify.tsx';

import Header from '../components/Header';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import Author from '../components/Author';

import servicePath from '../config/apiUrl';

import { Row, Col, Icon, Breadcrumb, Affix } from 'antd';

import '../public/style/pages/detail.css';
import 'highlight.js/styles/monokai-sublime.css';

const Detail = props => {
	const tocify = new Tocify();
	const renderer = new marked.Renderer();

	renderer.heading = function(text, level, raw) {
		const anchor = tocify.add(text, level);
		return `<a id='${anchor}' href='#${anchor}' class='anchor-fix'><h${level}>${text}</h${level}></a>\n`;
	};

	marked.setOptions({
		renderer: renderer,
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		highlight: function(code) {
			return hljs.highlightAuto(code).value;
		}
	});

	let html = marked(props.article_content);

	return (
		<div>
			<Head>
				<title>Detail</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header></Header>
			<Row className="comm-main" type="flex" justify="center">
				<Col
					className="comm-left"
					xs={24}
					sm={24}
					md={16}
					lg={18}
					xl={14}
				>
					<div>
						<div className="bread-div">
							<Breadcrumb>
								<Breadcrumb.Item>
									<a href="/">首页</a>
								</Breadcrumb.Item>
								<Breadcrumb.Item>
									<a href="/">视频列表</a>
								</Breadcrumb.Item>
								<Breadcrumb.Item>xxx</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<div className="detailed-title">React实战</div>
							<div className="list-icon center">
								<span>
									<Icon type="calendar" /> 2019-12-14
								</span>
								<span>
									<Icon type="folder" /> 视频教程
								</span>
								<span>
									<Icon type="fire" /> 1213人
								</span>
							</div>
							<div
								className="detailed-content"
								dangerouslySetInnerHTML={{ __html: html }}
							></div>
						</div>
					</div>
				</Col>
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
					<Author></Author>
					<Advert></Advert>
					<Affix offsetTop={8}>
						<div className="detailed-nav comm-box">
							<div className="nav-title">文章目录</div>
							{tocify && tocify.render()}
						</div>
					</Affix>
				</Col>
			</Row>
			<Footer></Footer>
		</div>
	);
};

Detail.getInitialProps = async context => {
	console.log(context);
	let id = context.query.id;
	const promise = new Promise((resolve, reject) => {
		axios(servicePath.getArticleById + id).then(
			res => {
				resolve(res.data.data[0]);
			}
		);
	});
	return await promise;
};

export default Detail;
