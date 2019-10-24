import React from 'react';
import { connect } from 'react-redux';

const TodoList = props => {
	let { inputValue, list, inputChange, clickBtn } = props;
	return (
		<div>
			<div>
				<input type="text" value={inputValue} onChange={inputChange} />
				<button onClick={clickBtn}>提交</button>
			</div>
			<ul>
				{list.map((item, index) => {
					return <li key={index + item}>{item}</li>;
				})}
			</ul>
		</div>
	);
};

const stateToProps = state => {
	return {
		inputValue: state.inputValue,
		list: state.list
	};
};

const dispatchToProps = dispatch => {
	return {
		inputChange(e) {
			const action = {
				type: 'change_input',
				value: e.target.value
			};
			dispatch(action);
		},
		clickBtn() {
			const action = {
				type: 'add_item'
			};
			dispatch(action);
		}
	};
};

export default connect(
	stateToProps,
	dispatchToProps
)(TodoList);
