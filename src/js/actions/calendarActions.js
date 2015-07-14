var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var calendarActions = {
	changeSearch: function(search) {
		AppDispatcher.handleAction({
			actionType: appConstants.CHANGE_SEARCH,
			data: search
		});
	},
	selectDay: function(index, day) {
		AppDispatcher.handleAction({
			actionType: appConstants.SELECT_DAY,
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
		AppDispatcher.handleAction({
			actionType: appConstants.UPDATE_MONTH,
			data: update
		});
	}
};

module.exports = calendarActions;