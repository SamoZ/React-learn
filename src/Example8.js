/**
 * useRef
 * 获取DOM元素
 */

import React, { useRef, useState, useEffect } from 'react';

function Example8() {
	const inputEl = useRef(null);
	const onButtonClick = () => {
		inputEl.current.value = 'Hello';
		console.log(inputEl);
	};

    const [text, setText] = useState('hello');
    const textRef = useRef();

    useEffect(() => {
        textRef.current = text;
        console.log('textRef.current: ',textRef.current)
    })


	return (
		<>
			<input type="text" ref={inputEl} />
			<button onClick={onButtonClick}>在input上展示文字</button>
			<br />
			<br />
			<input
				type="text"
				value={text}
				onChange={e => {
					setText(e.target.value);
				}}
			/>
		</>
	);
}

export default Example8;
