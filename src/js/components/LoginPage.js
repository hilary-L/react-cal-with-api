import React from 'react';
import Navigation from 'react-router/lib/Navigation';

var calendarStore = require('../stores/calendarStore');
var calendarActions = require('../actions/calendarActions');
var WebAPIUtils = require('../utils/WebAPIUtils');

var LoginPage = React.createClass({

	mixins: [ Navigation ],

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
	handleSubmit: function(e) {
		e.preventDefault();
		var email = this.refs.email.getDOMNode().value;
		var password = this.refs.password.getDOMNode().value;
		this.login(email, password);
	},
	render: function() {
		return(
		<div className="login-form-box">
			<form ref="form" onSubmit={this.handleSubmit}>
				<h1>React.js Task Calendar</h1>
				<input type="email" ref="email" className="email-input" value="example-2@example.com" readOnly/>
				<input type="password" ref="password" className="password-input" value="fizzbuzz" readOnly/>
				<button type="submit">Login</button>
				<p>For example purposes, email and password are locked. Click the button to view the calendar</p>
			</form>
		</div>
		)
	}
});

module.exports = LoginPage;