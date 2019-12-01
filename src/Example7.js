/** 
 * useMemo
 * 防止子组件方法频繁触发, 缓存组件状态
*/
import React, { useState, useMemo } from 'react';

function Example7() {
	const [xiaohong, setXiaohong] = useState('小红');
	const [xiaoming, setXiaoming] = useState('小明');

	return (
		<>
			<button
				onClick={() => {
					setXiaohong(new Date().getTime());
				}}
			>
				小红
			</button>
			<button
				onClick={() => {
					setXiaoming(new Date().getTime() + '小明');
				}}
			>
				小明
			</button>
			<ChildComponent name={xiaohong}>{xiaoming}</ChildComponent>
		</>
	);
}

function ChildComponent({ name, children }) {
    function changeXiaohong() {
        console.log('changeXiaohong');
        return name + ', 小红';
    }

    const actionXiaohong = useMemo(changeXiaohong, [name]);
	return (
		<>
			<div>{actionXiaohong}</div>
			<div>{children}</div>
		</>
	);
}

export default Example7;
