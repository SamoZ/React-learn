import { takeEvery, put } from 'redux-saga/effects';
import { GET_MY_LIST } from './actionTypes';
import { getListAction } from './actionCreators';
import axios from 'axios';

function* mySaga() {
	yield takeEvery(GET_MY_LIST, getList);
}

function* getList() {
	// axios
	// 	.get(
	// 		'https://easy-mock.com/mock/5db04e28374f867d204a1c5c/reactdemo/getList'
	// 	)
	// 	.then(res => {
	// 		const data = res.data.data;
	// 		const action = getListAction(data);
	// 		put(action);
	// 	});
	const res = yield axios.get(
		'https://easy-mock.com/mock/5db04e28374f867d204a1c5c/reactdemo/getList'
    );
    const action = getListAction(res.data.data);
    yield put(action);
}

export default mySaga;
