import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const Home = () => {

  /** 
   * routeChangeStart
   * routeChangeComplete
   * beforeHistoryChange
   * routeChangeError
   * hashChangeStart
   * hashChangeComplete
  */

  Router.events.on('routeChangeStart', (...args) => {
    console.log('1-routeChangeStart，参数为：', ...args);
  })
  Router.events.on('routeChangeComplete', (...args) => {
    console.log('2-routeChangeComplete，参数为：', ...args);
  })
  Router.events.on('beforeHistoryChange', (...args) => {
    console.log('3-beforeHistoryChange，参数为：', ...args);
  })
  Router.events.on('routeChangeError', (...args) => {
    console.log('4-routeChangeError，参数为：', ...args);
  })
  Router.events.on('hashChangeStart', (...args) => {
    console.log('5-hashChangeStart，参数为：', ...args);
  })
  Router.events.on('hashChangeComplete', (...args) => {
    console.log('6-hashChangeComplete，参数为：', ...args);
  })

	function goToA() {
		Router.push({
			pathname: '/a',
			query: { name: '小王' }
		});
	}
	return (
		<>
			<div>首页</div>
			<div>
				<Link href={{ pathname: '/a', query: { name: '小明' } }}>
					<a>A</a>
				</Link>
				<br />
				<Link href="/a?name=小红">
					<a>B</a>
				</Link>
			</div>
			<div>
				<button onClick={goToA}>小王</button>
			</div>
      <div>
        <Link href="#a"><a>小张</a></Link>
      </div>
		</>
	);
};

export default Home;
