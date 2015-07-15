var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {

	accessToken: '',
	email: '',
	errors: []

};

var setSession = function(json) {
	_store.accessToken = json.access_token;
	_store.email = json.email;
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

sessionStore.dispatchToken = AppDispatcher.register(function(payload){
	var action = payload.action;
	switch(action.actionType){
		case appConstants.LOGIN_RESPONSE:
			if (action.json && action.json.access_token) {
				setSession(action.json);
				sessionStorage.setItem('accessToken', _store.accessToken);
				sessionStorage.setItem('email', _store.email);
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