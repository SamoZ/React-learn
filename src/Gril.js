import React, { Component, Fragment } from 'react';
import GrilItem from './Grilitem';
import Boss from './Boss';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './style.css';

class Gril extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			list: ['基础按摩', '精油推背']
		};
	}

	// UNSAFE_componentWillMount() {
	// 	console.log('UNSAFE_componentWillMount-----组件将要挂载到页面');
	// }

	componentDidMount() {
		console.log('componentDidMount-----组件挂载完成');
	}

	// shouldComponentUpdate() {
	// 	// 在组件更新之前
	// 	console.log('shouldComponentUpdate');
	// 	return true;
	// }

	// UNSAFE_componentWillUpdate() {
	// 	// 在上面的钩子函数之后执行
	// 	console.log('UNSAFE_componentWillUpdate');
	// }

	// componentDidUpdate() {
	// 	console.log('componentDidUpdate');
	// }

	// // 顶层组件没有props传值，不会触发
	// UNSAFE_componentWillReceiveProps() {
	// 	console.log('UNSAFE_componentWillReceiveProps');
	// }

	render() {
		// console.log('render-----组件挂载中');
		return (
			// <div>
			<Fragment>
				{/* 注释 */}
				<div>
					<label htmlFor="input">增加服务</label>
					<input
						id="input"
						className="input"
						value={this.state.inputValue}
						onChange={this.inputhange.bind(this)}
						ref={input => {
							this.input = input;
						}}
					/>
					<button onClick={this.addList.bind(this)}>增加服务</button>
				</div>
				<ul ref={ul => (this.ul = ul)}>
					<TransitionGroup>
						{this.state.list.map((item, index) => {
							return (
								/* 
									<li
										key={index + item}
										onClick={this.deleteItem.bind(this, index)}
										dangerouslySetInnerHTML={{__html:item}}
									>
										{item}
									</li>
								*/
								<CSSTransition
									timeout={2000}
									classNames="boss-text"
									unmountOnExit
									appear={true}
									key={index + item}
								>
									<GrilItem
										key={index + item}
										content={item}
										index={index}
										deleteItem={this.deleteItem.bind(this)}
									/>
								</CSSTransition>
							);
						})}
					</TransitionGroup>
				</ul>
				<Boss />
			</Fragment>
			// </div>
		);
	}

	inputhange() {
		// console.log(this.input.value);
		this.setState({
			inputValue: this.input.value
		});
	}

	addList() {
		this.setState(
			{
				inputValue: '',
				list: [...this.state.list, this.state.inputValue]
			}
			// () => {
			// 	console.log(this.ul.querySelectorAll('li').length);
			// }
		);
	}

	deleteItem(index) {
		// console.log(index);
		let list = this.state.list;
		list.splice(index, 1);
		this.setState({
			list: list
		});
	}
}

export default Gril;
