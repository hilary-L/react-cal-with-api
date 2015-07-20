var calendarActions = require('../actions/calendarActions');
var request = require('superagent');
var appConstants = require('../constants/appConstants');

var WebAPIUtils = {
	login: function(email, password) {
		request.post(appConstants.APIEndpoints.LOGIN)
			.send({email: email, password: password, grant_type: 'password' })
				.set('Accept', 'application/json')
				.end(function(error, res) {
					if(res) {
						if(res.error) {
							console.log("Received error response.");
							var errorMessages = _getErrors(res);
							calendarActions.receiveLogin(null, errorMessages)
							console.log(errorMessages);
						}
						else {
							var json = JSON.parse(res.text);
							calendarActions.receiveLogin(json, null);
						}
					}
				});
	},
	getEvents: function() {
		request.get(appConstants.APIEndpoints.EVENTS)
			.set({ 'Accept': 'application/json', 'Authorization': sessionStorage.getItem('accessToken') })
			.end(function(error, res) {
				if (res) {
					if(res.error) {
						console.log('Error!');
						console.log(res.error);
					}
					else {
						var json = JSON.parse(res.text);
						calendarActions.receiveEvents(json, null);
					}
					
				}
				else if (error) {
					console.log('No response! Error!');
					console.log(error);
				}
			});
	}
};

module.exports = WebAPIUtils;