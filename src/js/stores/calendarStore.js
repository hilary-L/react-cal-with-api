var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var moment = require('moment');

var CHANGE_EVENT = 'change';

var _store = {
	// today is set when app loads and does not change
	today: {
		date: moment(),
		year: moment().year(),
		month: moment().format('MMMM'),
		// monthIndex is the month number obtained from moment, incremented by 1 to match node-calendar's format
		monthIndex: moment().month() + 1,
		weekIndex: moment().week(),
		dayIndex: moment().date(),
		time: moment().format('h:mm a')

	},
	// display is the date information that is currently displayed in the calendar view, and is updated via user interaction
	// we initially set displayed to match today's date so that calendar can render before API returns data
	displayed: {
		date: moment(),
		year: moment().year(),
		month: moment().format('MMMM'),
		monthIndex: moment().month() + 1,
		weekIndex: moment().week(),
		dayIndex: moment().date(),
		time: moment().format('h:mm a')
	},
	// selected is the currently selected day displayed on the task list
	selectedDay: {
		date: moment(),
		year: moment().year(),
		month: moment().format('MMMM'),
		monthIndex: moment().month() + 1,
		weekIndex: moment().week(),
		dayIndex: moment().date(),
	},
	search: '',
	events: []
	
}

var changeSearch = function(data) {
	_store.search = data;
};

var selectDay = function(data) {
	_store.selectedDay = {
		date: data.date,
		year: data.year,
		month: data.month,
		monthIndex: data.monthIndex,
		weekIndex: data.weekIndex,
		dayIndex: data.dayIndex,

	}
};

var changeDisplay = function(data) {

	_store.displayed = data;
	console.log("New store update!")
	console.log(_store.displayed);
};

var updateMonth = function(update) {
	var newMonth = _store.displayed.monthIndex + update;

	if(newMonth == 0) {
		_store.displayed.year -= 1;
		_store.displayed.monthIndex = 12;
		_store.displayed.date = moment({
			y: _store.displayed.year,
			M: _store.displayed.monthIndex - 1
		});
		_store.displayed.month = moment(_store.displayed.date).format('MMMM');
	}
	else if(newMonth == 13) {
		_store.displayed.year += 1;
		_store.displayed.monthIndex = 1;
		_store.displayed.date = moment({
			y: _store.displayed.year,
			M: _store.displayed.monthIndex -1
		});
		_store.displayed.month = moment(_store.displayed.date).format('MMMM');
	}
	else {
		_store.displayed.monthIndex += update;
		_store.displayed.date = moment({
			y: _store.displayed.year,
			M: _store.displayed.monthIndex - 1
		});
		_store.displayed.month = moment(_store.displayed.date).format('MMMM');
	}
};

var updateEvents = function(data) {
	var formattedEvents = data.events.map(function(item) {
			return(
				{
					category: item.category,
					content: item.content,
					help: item.help,
					moment: moment(item.date),
					time: moment(item.date).format('h:mm a'),
					hour: moment(item.date).format('h a')
				}
			)
		});
	_store.events = formattedEvents;

};

var calendarStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},
	getToday: function() {
		return _store.today;
	},
	getDisplayed: function() {
		return _store.displayed;
	},
	getSelected: function() {
		return _store.selectedDay;
	},
	getSearch: function() {
		return _store.search;
	},
	getEvents: function() {
		return _store.events;
	}
});

calendarStore.dispatchToken = AppDispatcher.register(function(action){
	switch(action.actionType){
		case appConstants.ActionTypes.CHANGE_SEARCH:
			changeSearch(action.data);
			calendarStore.emit(CHANGE_EVENT);
			break;
		case appConstants.ActionTypes.UPDATE_MONTH:
			updateMonth(action.data);
			calendarStore.emit(CHANGE_EVENT);
			break;
		case appConstants.ActionTypes.SELECT_DAY:
			selectDay(action.data);
			calendarStore.emit(CHANGE_EVENT);
			break;
		case appConstants.ActionTypes.RECEIVE_EVENTS:
			updateEvents(action.json);
			calendarStore.emit(CHANGE_EVENT);
			break;
		case appConstants.ActionTypes.CHANGE_DISPLAY:
			changeDisplay(action.data);
			calendarStore.emit(CHANGE_EVENT);
			break;
		default:
			return true;
	}
});

module.exports = calendarStore;




