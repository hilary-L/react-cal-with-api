import React from 'react';
var calendarActions = require('../actions/calendarActions');
var DisplayHeader = require('./DisplayHeader');
var moment = require('moment');
var Tasks = require('./Tasks');
var Occasions = require('./Occasions');
require('twix');

var Day = React.createClass({

	handleUpdateDay: function() {

	},

	render: function() {

		var dayToMatch = this.props.selectedDay;

		console.log(dayToMatch);

		var filteredWeek = this.props.month.filter(function(week) {

			return week.some(function(day) {

				return day.dayIndex == dayToMatch.dayIndex && day.monthIndex == dayToMatch.monthIndex
			})

		});

		console.log(filteredWeek);

		var matchedDay = filteredWeek[0].filter(function(day) {

			return day.dayIndex == dayToMatch.dayIndex
		});

		console.log(matchedDay);

		var timeStrings = ["All Day", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm"];

		var formattedDay = timeStrings.map(function(time) {

			if(time == "All Day") {

				return {
					time: time,
					tasks: [],
					holiday: matchedDay.holiday,
					}
			}
			else if(matchedDay[0].tasks.length > 0 ) {

				var tasksAtTime = matchedDay[0].tasks.filter(function(task) {

					return task.hour == time
				});

				return {

					time: time,
					tasks: tasksAtTime

					}

			}
			else {

				return {
					time: time,
					tasks: []

					}
			}
		});

		console.log(formattedDay);



		return (
				<div>
				</div>
		)

	}


});

module.exports = Day;