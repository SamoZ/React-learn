import { Avatar, Divider } from 'antd';

import '../public/style/components/author.css';

const Author = () => {
	return (
		<div className="author-div comm-box">
			<div>
				<Avatar
					size={100}
					src="http://b-ssl.duitang.com/uploads/item/201511/13/20151113110434_kyReJ.jpeg"
				/>
			</div>
            <div className="author-introduction">
                这里是介绍
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account" />
                <Avatar size={28} icon="qq" className="account" />
                <Avatar size={28} icon="wechat" className="account" />
            </div>

		</div>
	);
};

export default Author;
