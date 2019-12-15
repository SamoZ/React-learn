import React, { useState } from 'react';
import axios from 'axios';
import servicePath from '../config/apiUrl';

import { Card, Input, Icon, Button, Spin, message } from 'antd';

import 'antd/dist/antd.css';
import '../static/css/login.css';

function Login(props) {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const checkLogin = () => {
		setIsLoading(true);
		if (!userName) {
			message.error('用户名不能为空');
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
			return false;
		} else if (!password) {
			message.error('密码不能为空');
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
			return false;
		}
		let dataProps = {
			userName: userName,
			password: password
		};

		axios({
			method: 'POST',
			url: servicePath.checkLogin,
			data: dataProps,
			withCredentials: true // 共享 session
		}).then(res => {
			setIsLoading(false);
			if (res.data.data === '登录成功') {
				localStorage.setItem('openId', res.data.openId);
				props.history.push('/index');
			} else {
				message.error('用户名或密码错误');
			}
		});
	};

	return (
		<div className="login-div">
			<Spin tip="Loading..." spinning={isLoading}>
				<Card title="个人博客 System" bordered style={{ width: 400 }}>
					<Input
						id="userName"
						size="large"
						placeholder="输入你的用户名"
						prefix={
							<Icon
								type="user"
								style={{ color: 'rgba(0,0,0,.25' }}
							/>
						}
						onChange={e => {
							setUserName(e.target.value);
						}}
					/>
					<br />
					<br />
					<Input.Password
						id="password"
						size="large"
						placeholder="输入你的密码"
						prefix={
							<Icon
								type="key"
								style={{ color: 'rgba(0,0,0,.25' }}
							/>
						}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<br />
					<br />
					<Button
						type="primary"
						size="large"
						block
						onClick={checkLogin}
					>
						登录
					</Button>
				</Card>
			</Spin>
		</div>
	);
}

export default Login;
