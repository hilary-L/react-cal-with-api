import React from 'react';
var calendarActions = require('../actions/calendarActions');
var DisplayHeader = require('./DisplayHeader');
var moment = require('moment');
var Tasks = require('./Tasks');
var Occasions = require('./Occasions');
require('twix');

var Day = React.createClass({

	handleUpdateDay: function(update) {

		var displayed = this.props.displayed;

		if (update == 1) {
			var newDate = moment(displayed.date).add(1, 'days');
		}
		else {
			var newDate = moment(displayed.date).subtract(1, 'days');
		}

		var day = {
			date: newDate,
			year: newDate.year(),
			month: newDate.format('MMMM'),
			monthIndex: newDate.month() + 1,
			weekIndex: newDate.week(),
			dayIndex: newDate.date()
		};

		calendarActions.changeDisplay(day);
		calendarActions.selectDay(day);

	},

	render: function() {

		var dayOfWeek = moment(this.props.displayed.date).format('dddd');
	
		var self = this;

		var dayToMatch = this.props.displayed;

		var caption = dayToMatch.month + " " + dayToMatch.dayIndex + ", " + dayToMatch.year;

		var filteredWeek = this.props.month.filter(function(week) {

			return week.some(function(day) {

				return day.dayIndex == dayToMatch.dayIndex && day.monthIndex == dayToMatch.monthIndex
			})

		});

		var matchedDay = filteredWeek[0].filter(function(day) {

			return day.dayIndex == dayToMatch.dayIndex
		});


		var timeStrings = ["All Day", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm"];

		var formattedDay = timeStrings.map(function(time) {

			if(time == "All Day") {

				return {
					time: time,
					tasks: [],
					holiday: matchedDay[0].holiday,
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

		var dayJSX = formattedDay.map(function(hour, index) {

			if(hour.time == "All Day" && formattedDay[0].holiday) {

				var holidays = (
						<div className="holidays">
								<h3>{formattedDay[0].holiday}</h3>
						</div>

				)


			}
			else {

				var holidays = '';
			}

			if(hour.tasks.length > 0) {

				var tasksJSX = (
						<li key={index}>
							{holidays}
							<div className="info">
								<Occasions occasions={hour.tasks} filter={self.props.filter} />
								<Tasks tasks={hour.tasks} filter={self.props.filter} />
							</div>
						</li>
					)
			}
			else {

				var tasksJSX = (
							<li key={index}>
								{holidays}
							</li>

				)

			}

			return (

				<div key={index} className="time-row">
					<ul>
						<li className="time">{hour.time}</li>
						{tasksJSX}
					</ul>
				</div>
			)


		});



		return (
				<div className="day-view">
					<DisplayHeader caption={caption} updateAction={this.handleUpdateDay} />
					<div className="days-header mdl-layout__header-row mdl-shadow--1dp">
							<h4>{dayOfWeek}</h4>
					</div>
					<div className="day-display">
						{dayJSX}
					</div>
				</div>
		)

	}


});

module.exports = Day;