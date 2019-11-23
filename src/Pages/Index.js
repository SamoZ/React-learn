import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [
				{ cid: 1, title: '啊啊1' },
				{ cid: 2, title: '啊啊2' },
				{ cid: 3, title: '啊啊3' },
				{ cid: 4, title: '啊啊4' }
			]
        };
        this.props.history.push('/home');
	}
	render() {
		return (
			<div>
                {/* <Redirect to="/home/"></Redirect> */}
				<h2>index</h2>
				<ul>
					{this.state.list.map((item, index) => {
						return (
							<li key={index}>
								<Link to={'/list/' + item.cid}>{item.title}</Link>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default Index;
