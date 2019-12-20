import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login';
import Index from './Index';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';

function Main() {
	return (
		<Router>
			<Route path="/" exact component={Login} />
			<Route path="/index/" component={Index} />
		</Router>
	);
}

export default Main;
