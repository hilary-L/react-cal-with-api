import React from 'react';
import { Router, Route } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory';

var sessionStore = require('../stores/sessionStore');
var Cal = require('./Cal');
var LoginPage = require('./LoginPage');
var Month = require('./Month');
var View = require('./View');
var Week = require('./Week');


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
			<Route path="cal" component={Cal}>
				<Route path="view" component={View}>
					<Route path="month" component={Month}/>
					<Route path="week" component={Week}/>
				</Route>
			</Route>
		</Route>
	</Router>
	), document.getElementById('app'));

module.exports = CalApp;