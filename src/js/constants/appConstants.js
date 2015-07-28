var APIRoot = "http://sheltered-shelf-4779.herokuapp.com";

var appConstants = {

	APIEndpoints: {
		LOGIN: APIRoot + "/api/v1/login",
		EVENTS: APIRoot + "/api/v1/events",
	},

	ActionTypes: {
		CHANGE_SEARCH: "CHANGE_SEARCH",
		UPDATE_MONTH: "UPDATE_MONTH",
		SELECT_DAY: "SELECT_DAY",
		LOGIN_REQUEST: "LOGIN_REQUEST",
		LOGIN_RESPONSE: "LOGIN_RESPONSE",
		REDIRECT: "REDIRECT",
		LOAD_EVENTS: "LOAD_EVENTS",
		RECEIVE_EVENTS: "RECEIVE_EVENTS",
		LOAD_CAL: "LOAD_CAL",
		CHANGE_DISPLAY: "CHANGE_DISPLAY"
	}
	

};

module.exports = appConstants;