var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var sessionStore = require('../stores/sessionStore');
var Cal = require('./Cal');
var LoginPage = require('./LoginPage');

var routes = (
	<Route handler={CalApp}>
		<Route name="login" handler={LoginPage}/>
		<Route name="calendar" handler={Cal}/>
	</Route>
);

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
		this.setState({
			isLoggedIn: sessionStore.isLoggedIn()
		});
	},
	render: function() {

		return (
			<div className="app">
				<RouteHandler/>
			</div>
		)
	}
});

Router.run(routes, Router.HashLocation, function(Root) {
	React.render(<Root/>, document.getElementById('app'));
});

module.exports = CalApp;