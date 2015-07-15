var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleServerAction = function(action) {
	var payload = {
			source: 'SERVER_ACTION',
			action: action
		};
	this.dispatch(payload);
};

AppDispatcher.handleViewAction = function(action) {
	var payload = {
			source: 'VIEW_ACTION',
			action: action
		};
		this.dispatch(payload);
};


module.exports = AppDispatcher;