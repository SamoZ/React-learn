import React, { Component } from 'react';
import TodoListUI from './TodoListUI';
import {
	changeInputAction,
	addItemAction,
	deleteItemAction,
	getTodoList,
	getMyListAction
} from './store/actionCreators';

import store from './store';

import 'antd/dist/antd.css';

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = store.getState();
		// console.log(store.getState());
		this.changeInputValue = this.changeInputValue.bind(this);
		this.storeChange = this.storeChange.bind(this);
		this.clickBtn = this.clickBtn.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		store.subscribe(this.storeChange);
	}

	componentDidMount() {
		// const action = getTodoList();
		// store.dispatch(action);
		const action = getMyListAction();
		store.dispatch(action);
	}

	render() {
		return (
			<TodoListUI
				inputValue={this.state.inputValue}
				changeInputValue={this.changeInputValue}
				clickBtn={this.clickBtn}
				list={this.state.list}
				deleteItem={this.deleteItem}
			/>
		);
	}

	changeInputValue(e) {
		// console.log(e.target.value);
		// const action = {
		// 	type: CHANGE_INPUT,
		// 	value: e.target.value
		// };
		const action = changeInputAction(e.target.value);
		store.dispatch(action);
	}

	storeChange() {
		this.setState(store.getState());
	}

	clickBtn() {
		// const action = {
		// 	type: ADD_ITEM
		// };
		const action = addItemAction();
		store.dispatch(action);
	}

	deleteItem(index) {
		// const action = {
		// 	type: DELETE_ITEM,
		// 	index
		// };
		const action = deleteItemAction(index);
		store.dispatch(action);
	}
}

export default TodoList;
