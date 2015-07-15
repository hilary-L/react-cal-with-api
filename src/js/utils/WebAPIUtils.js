var calendarActions = require('../actions/calendarActions');
var request = require('superagent');

var WebAPIUtils = {
	login: function(email, password) {
		request.post('http://sheltered-shelf-4779.herokuapp.com/api/v1/login')
			.send({email: email, password: password, grant_type: 'password' })
				.set('Accept', 'application/json')
				.end(function(error, res) {
					if(res) {
						if(res.error) {
							console.log("Received error response.");
							var errorMessages = _getErrors(res);
							calendarActions.receiveLogin(null, errorMessages)
							console.log("Error! " + errorMessages);
						}
						else {
							console.log("Received success response!");
							console.log(calendarActions);
							json = JSON.parse(res.text);
							calendarActions.receiveLogin(json, null);
							console.log("Success! " + json);
						}
					}
				});
	}
};

module.exports = WebAPIUtils;