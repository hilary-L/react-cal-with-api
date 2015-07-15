var React = require('react');
var calendarStore = require('../stores/calendarStore');
var calendarActions = require('../actions/calendarActions');
var WebAPIUtils = require('../utils/WebAPIUtils');

var LoginPage = React.createClass({
	login: function(email, password) {
		console.log(email + " " + password);
		calendarActions.login({
			email: email,
			password: password
		});
		WebAPIUtils.login(email, password);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var email = this.refs.email.getDOMNode().value;
		var password = this.refs.password.getDOMNode().value;
		this.login(email, password);
	},
	render: function() {
		return(
			<form ref="form" onSubmit={this.handleSubmit}>
				<input type="email" ref="email" className="email-input" value="example-1@example.com"/>
				<input type="password" ref="password" className="password-input" value="fizzbuzz" />
				<button type="submit">Login</button>
				<p>For example purposes, email and password are locked. Click the button to view the calendar</p>
			</form>
		)
	}
});

module.exports = LoginPage;