import React, { useReducer } from 'react';

function ReducerDemo() {
	const [count, dispatch] = useReducer((state, action) => {
		switch (action) {
			case 'add':
				return state + 1;
			case 'sub':
				return state - 1;
			default:
				return false;
		}
	}, 0);

	return (
		<div>
			<h2>分数{count}</h2>
            <button onClick={ () => {dispatch('add')} }>Increment</button>
            <button onClick={ () => {dispatch('sub')} }>Decrement</button>
		</div>
	);
}

// Reducer
// function countReducer(state, action) {
//     switch(action.type) {
//         case 'add':
//             return state + 1;
//         case 'sub':
//             return state - 1;
//         default:
//             return false;
//     }
// }

export default ReducerDemo
