import {
	CHANGE_INPUT,
	ADD_ITEM,
	DELETE_ITEM,
	GET_LIST,
	GET_MY_LIST
} from './actionTypes';
import axios from 'axios';

export const changeInputAction = value => ({
	type: CHANGE_INPUT,
	value
});

export const addItemAction = () => ({
	type: ADD_ITEM
});

export const deleteItemAction = index => ({
	type: DELETE_ITEM,
	index
});

export const getListAction = data => ({
	type: GET_LIST,
	data
});

export const getTodoList = () => {
	return dispatch => {
		axios
			.get(
				'https://easy-mock.com/mock/5db04e28374f867d204a1c5c/reactdemo/getList'
			)
			.then(res => {
				const data = res.data.data;
				const action = getListAction(data);
				dispatch(action);
			});
	};
};

export const getMyListAction = () => ({
	type: GET_MY_LIST
});
