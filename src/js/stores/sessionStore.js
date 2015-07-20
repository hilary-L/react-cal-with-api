var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var WebAPIUtils = require('../utils/WebAPIUtils');

var CHANGE_EVENT = 'change';

var _store = {

	accessToken: '',
	email: '',
	errors: []

};

var setSession = function(json) {
	_store.accessToken = json.session.access_token;
	_store.email = json.session.email;
}

var setErrors = function(errors) {
	_store.errors = errors;
}


var sessionStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},
	getAccessToken: function() {
		return _store.accessToken;
	},
	getErrors: function() {
		return _store.errors;
	},
	getEmail: function() {
		return _store.email;
	},
	isLoggedIn: function() {
		return _store.accessToken ? true : false;
	}
});

sessionStore.dispatchToken = AppDispatcher.register(function(action){
	switch(action.actionType){
		case appConstants.ActionTypes.LOGIN_RESPONSE:
			if (action.json && action.json.session.access_token) {
				setSession(action.json);
				sessionStorage.setItem('accessToken', _store.accessToken);
				sessionStorage.setItem('email', _store.email);
				WebAPIUtils.getEvents();
			}
			else if (action.errors) {
				setErrors(action.errors);
			}
			sessionStore.emit(CHANGE_EVENT);
			break;
		default:
			return true;
	}
});

module.exports = sessionStore;