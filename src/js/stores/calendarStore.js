var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var moment = require('moment');

var CHANGE_EVENT = 'change';

var _store = {
	moment: {
		todayYear: moment().format('YYYY'),
		todayMonth: moment().format('MMMM'),
		today: moment().date(),
		moment: moment(),
		num: moment().month() + 1,
		name: moment().format('MMMM'),
		year: moment().year(),
		time: moment().format("h:mm a")
	},
	selectedDay: {
		year: null,
		month: null,
		num: null,
		tasks: []
	},
	search: '',
	events: []
};

var changeSearch = function(data) {
	_store.search = data;
};

var selectDay = function(data) {
	_store.selectedDay = {
		year: data.year,
		monthName: data.monthName,
		num: data.num,
		tasks: data.tasks,
	}

};

var updateMonth = function(update) {

	var newMonth = _store.moment.num + update;

	if(newMonth == 0) {
		_store.moment.year -= 1;
		_store.moment.num = 12;
		_store.moment.moment = moment({
			y: _store.moment.year,
			M: _store.moment.num - 1
		});
		_store.moment.name = moment(_store.moment.moment).format('MMMM');

	}
	else if(newMonth == 13) {
		_store.moment.year += 1;
		_store.moment.num = 1;
		_store.moment.moment = moment({
			y: _store.moment.year,
			M: _store.moment.num - 1
		});
		_store.moment.name = moment(_store.moment.moment).format('MMMM');
	}
	else {
		_store.moment.num += update;
		_store.moment.moment = moment({
			y: _store.moment.year,
			M: _store.moment.num - 1
		});
		_store.moment.name = moment(_store.moment.moment).format('MMMM');
	}

};

var updateEvents = function(events) {
	_store.events = events.events;
	console.log(_store.events);
}

var calendarStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},
	getMoment: function() {
		return _store.moment;
	},
	getSearch: function() {
		return _store.search;
	},
	getSelected: function() {
		return _store.selectedDay;
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
		default:
			return true;
	}
});

module.exports = calendarStore;