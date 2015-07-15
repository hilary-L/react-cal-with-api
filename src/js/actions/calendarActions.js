var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var calendarActions = {
	changeSearch: function(search) {
		AppDispatcher.handleViewAction({
			actionType: appConstants.ActionTypes.CHANGE_SEARCH,
			data: search
		});
	},
	selectDay: function(index, day) {
		AppDispatcher.handleViewAction({
			actionType: appConstants.ActionTypes.SELECT_DAY,
			data: {
				year: day.year,
				monthName: day.monthName,
				num: day.num,
				tasks: day.tasks,
				occasions: day.occasions
			}
		});
	},
	updateMonth: function(update) {
		AppDispatcher.handleViewAction({
			actionType: appConstants.ActionTypes.UPDATE_MONTH,
			data: update
		});
	},
	login: function(credentials) {
		console.log("Login request!");
		AppDispatcher.handleViewAction({
			actionType: appConstants.ActionTypes.LOGIN_REQUEST,
			data: credentials
		});
		
	},
	receiveLogin: function(json, errors) {
		console.log("Received login!");
		AppDispatcher.handleServerAction({
			actionType: appConstants.ActionTypes.LOGIN_RESPONSE,
			json: json,
			errors: errors
		});
	}
};

module.exports = calendarActions;