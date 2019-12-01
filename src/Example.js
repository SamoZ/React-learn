import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Index() {
    useEffect(() => {
        console.log('useEffect=>首页-in');
        return () => {
            console.log('useEffect=>首页-out')
        }
    }, []); // [] 表示Index销毁时触发
	return <h2>首页</h2>;
}

function List() {
    useEffect(() => {
        console.log('useEffect=>List');
        return () => {
            console.log('useEffect=>List-out')
        }
    });
    return <h2>List Page</h2>
}

// Hook 写法
function Example() {
	const [count, setCount] = useState(0); // 数组解构

	// let _useState = useState(0);
	// let count = _useState[0];
	// let setState = _useState[1];

	useEffect(() => {
        console.log(`useEffect=>You Clicked ${count}`);
        return () => {
            console.log('=======')
        }
	}, [count]);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				Click me
			</button>
            <Router>
                <ul>
                    <li>
                        <Link to="/">首页</Link>
                    </li>
                    <li>
                        <Link to="/list">列表</Link>
                    </li>
                </ul>
                <Route path="/" exact component={Index}></Route>
                <Route path="/list" component={List}></Route>
            </Router>
		</div>
	);
}

// class Example extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { count: 0 };
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<p>You clicked {this.state.count} times</p>
// 				<button onClick={this.addCount.bind(this)}>Click me</button>
// 			</div>
// 		);
// 	}

// 	addCount() {
// 		this.setState({
// 			count: this.state.count + 1
// 		});
// 	}
// }

export default Example;
