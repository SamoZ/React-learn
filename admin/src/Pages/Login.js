import React, { useState } from 'react';

import { Card, Input, Icon, Button, Spin } from 'antd';

import 'antd/dist/antd.css';
import '../static/css/login.css';

function Login() {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const checkLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

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
                    <br/><br/>
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
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin}>登录</Button>
				</Card>
			</Spin>
		</div>
	);
}

export default Login;
