var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var calendarActions = {
	changeSearch: function(search) {
		AppDispatcher.dispatch({
			actionType: appConstants.ActionTypes.CHANGE_SEARCH,
			data: search
		});
	},
	selectDay: function(index, day) {
		AppDispatcher.dispatch({
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
		AppDispatcher.dispatch({
			actionType: appConstants.ActionTypes.UPDATE_MONTH,
			data: update
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
	}
};

module.exports = calendarActions;