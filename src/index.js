import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Edit from './components/Edit';
import Login from './authentication/Login';
import SignUp from './authentication/SignUp';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={App} />
			<Route path='/login' component={Login} />
			<Route path='/signup' component={SignUp} />	
		</Switch>
	</BrowserRouter>, 
	document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
