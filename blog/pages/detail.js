import React from 'react';
import Head from 'next/head';

import Header from '../components/Header';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import { Row, Col, Icon, Breadcrumb } from 'antd';

import '../public/style/pages/detail.css';
import Author from '../components/Author';

const Detail = () => (
	<div>
		<Head>
			<title>Detail</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Header></Header>
		<Row className="comm-main" type="flex" justify="center">
			<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
				<div>
					<div className="bread-div">
						<Breadcrumb>
							<Breadcrumb.Item>
								<a href="/">首页</a>
							</Breadcrumb.Item>
							<Breadcrumb.Item>
								<a href="/">视频列表</a>
							</Breadcrumb.Item>
							<Breadcrumb.Item>
								xxx
							</Breadcrumb.Item>
						</Breadcrumb>
					</div>
					<div>
						<div className="detailed-title">
							React实战
						</div>
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
						<div className="detailed-content">
							markdown 内容
						</div>
					</div>
				</div>
			</Col>
			<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
				<Author></Author>
				<Advert></Advert>
			</Col>
		</Row>
		<Footer></Footer>
	</div>
);

export default Detail;
