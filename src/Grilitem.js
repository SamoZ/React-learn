import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GrilItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handClick = this.handClick.bind(this);
	}

	// 组件第一次存在于dom中，函数是不会被执行
	// 如果已经存在于dom中，函数才会被执行
	// UNSAFE_componentWillReceiveProps() {
	// 	console.log('UNSAFE_componentWillReceiveProps');
	// }

	// componentWillUnmount() {
	// 	console.log('componentWillUnmount');
	// }

	shouldComponentUpdate(nextProps, nextStatus) {
		if (nextProps.content !== this.props.content) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		console.log('render-child');
		return (
			<li onClick={this.handClick}>
				{this.props.avname}为你服务-{this.props.content}
			</li>
		);
	}

	handClick() {
		// console.log(this.props.index);
		this.props.deleteItem(this.props.index);
	}
}

GrilItem.defaultProps = {
	avname: '默认'
};

GrilItem.propTypes = {
	avname: PropTypes.string.isRequired,
	content: PropTypes.string,
	index: PropTypes.number
};

export default GrilItem;
