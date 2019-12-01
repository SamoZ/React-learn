import React, { useState } from 'react';

// let showSex = true;

function Example2() {
    const [age, setAge] = useState(18);
    // if (showSex) { // 不能存在条件语句中
    //     const [sex, setSex] = useState('男');
    //     showSex = false;
    // }
    const [sex, setSex] = useState('男');
	const [work, setWork] = useState('前端');
	return (
		<div>
			<p>小明今年：{age}岁</p>
			<p>性别：{sex}</p>
			<p>工作：{work}</p>
		</div>
	);
}

export default Example2;
