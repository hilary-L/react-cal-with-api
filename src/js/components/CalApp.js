import React from 'react';
import { Router, Route } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory';

var sessionStore = require('../stores/sessionStore');
var Cal = require('./Cal');
var LoginPage = require('./LoginPage');
var Month = require('./Month');


var CalApp = React.createClass({
	getInitialState: function() {
		return ({
			isLoggedIn: sessionStore.isLoggedIn()
		}
		)
	},
	componentDidMount: function() {
		sessionStore.addChangeListener(this._onChange);

	},
	componentWillUnMount: function() {
		sessionStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		//this.setState({
			//isLoggedIn: sessionStore.isLoggedIn()
		//});
	},
	render: function() {

		return (
			<div className="app">
				{this.props.children}
			</div>
		)
	}
});


React.render((
	<Router history={new HashHistory}>
		<Route path="/" component={CalApp}>
			<Route path="login" component={LoginPage}/>
			<Route path="cal" component={Cal}/>
		</Route>
	</Router>
	), document.getElementById('app'));

module.exports = CalApp;