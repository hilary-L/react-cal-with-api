import React from 'react';
import { Router, Route } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory';
import Navigation from 'react-router/lib/Navigation';

var calendarStore = require('../stores/calendarStore');
var calendarActions = require('../actions/calendarActions');
var sessionStore = require('../stores/sessionStore');
var Cal = require('./Cal');
var LoginPage = require('./LoginPage');
var Month = require('./Month');
var View = require('./View');
var Week = require('./Week');
var Day = require('./Day');
var Year = require('./Year');
var WebAPIUtils = require('../utils/WebAPIUtils');



var CalApp = React.createClass({

	mixins: [ Navigation ],

	getInitialState: function() {
		return ({
			isLoggedIn: sessionStore.isLoggedIn()
		}
		)
	},
	componentDidMount: function() {
		sessionStore.addChangeListener(this._onChange);
		var email = "example-2@example.com";
		var password = "fizzbuzz";
		this.login(email, password);

	},
	componentWillUnMount: function() {
		sessionStore.removeChangeListener(this._onChange);
	},
	login: function(email, password) {
		console.log("Calling login function!");
		console.log(email + " " + password);
		calendarActions.login({
			email: email,
			password: password
		});
		console.log("WebAPIUtils about to be called!");
		WebAPIUtils.login(email, password);
		setTimeout(this.transitionTo('cal/view/month'), 2000);

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
					<Route path="day" component={Day}/>
					<Route path="year" component={Year}/>
				</Route>
			</Route>
		</Route>
	</Router>
	), document.getElementById('app'));

module.exports = CalApp;