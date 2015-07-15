var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var sessionStore = require('./sessionStore');

var CHANGE_EVENT = 'change';

var Router = require('react-router');
var routes = require('../routes.js');

var router = Router.create({
	routes: routes,
	location: null
});

var routeStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},
	getRouter: function() {
		return router;
	}
});

AppDispatcher.register(function(payload){
	AppDispatcher.waitFor([
		sessionStore.dispatchToken
	]);
	var action = payload.action;
	switch(action.actionType){
		case appConstants.REDIRECT:
			router.transitionTo(action.route);
			break;
		case appConstants.LOGIN_RESPONSE:
			if (sessionStore.isLoggedin()) {
				router.transitionTo('calendar');
			}
			break;
		default:
			return true;
	}
});

module.exports = routeStore;