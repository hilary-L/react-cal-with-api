var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var calendarActions = {
	changeFilter: function(filter) {
		AppDispatcher.dispatch({
			actionType: appConstants.ActionTypes.CHANGE_FILTER,
			data: filter
		});

	},
	changeSearch: function(search) {
		AppDispatcher.dispatch({
			actionType: appConstants.ActionTypes.CHANGE_SEARCH,
			data: search
		});
	},
	selectDay: function(day) {
		AppDispatcher.dispatch({
			actionType: appConstants.ActionTypes.SELECT_DAY,
			data: day
		});
	},
	login: function(credentials) {
		AppDispatcher.dispatch({
			actionType: appConstants.ActionTypes.LOGIN_REQUEST,
			data: credentials
		});
		
	},
	receiveLogin: function(json, errors) {
		AppDispatcher.dispatch({
			actionType: appConstants.ActionTypes.LOGIN_RESPONSE,
			json: json,
			errors: errors
		});
	},
	receiveEvents: function(json, errors) {
		AppDispatcher.dispatch({
			actionType: appConstants.ActionTypes.RECEIVE_EVENTS,
			json: json,
			errors: errors
		})
	},
	changeDisplay: function(day) {
		AppDispatcher.dispatch({
			actionType: appConstants.ActionTypes.CHANGE_DISPLAY,
			data: day
		});
	},
	changeButton: function(selection) {
		AppDispatcher.dispatch({
			actionType: appConstants.ActionTypes.CHANGE_BUTTON,
			data: selection
		});
	}
};

module.exports = calendarActions;