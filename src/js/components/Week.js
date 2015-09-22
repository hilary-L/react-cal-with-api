import React from 'react';
var calendarActions = require('../actions/calendarActions');
var DisplayHeader = require('./DisplayHeader');
var moment = require('moment');
var Tasks = require('./Tasks');
var Occasions = require('./Occasions');
require('twix');


var Week = React.createClass({

	handleSelectDay: function(day) {
		var selectedDay = day.moment._i;
		calendarActions.selectDay(selectedDay);
	},

	handleUpdateWeek: function(update) {

		var displayed = this.props.displayed;

		if (update == 1) {
			var newDate = moment(displayed.date).add(7, 'days');
		}
		else {
			var newDate = moment(displayed.date).subtract(7, 'days');
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
	},

	render: function() {

		var self = this;

		var dayToMatch = this.props.displayed;

		var displayedWeek = this.props.month.filter(function(week) {

			return week.some(function(day) {
				return dayToMatch.dayIndex == day.dayIndex && dayToMatch.monthIndex == day.monthIndex;
			});
		});


		var caption = displayedWeek[0][0].month + ' ' + displayedWeek[0][0].dayIndex + " - " + displayedWeek[0][6].month + " " + displayedWeek[0][6].dayIndex;

		var timeStrings = ["All Day", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm"];

		var weekToDisplay = displayedWeek[0].map(function(day) {

			
			var formattedDay = timeStrings.map(function(time) {

				if(time == "All Day") {

					return {

						time: time,
						tasks: [],
						holiday: day.holiday
					}
				}
				else if(day.tasks.length > 0) {

					var tasksAtTime = day.tasks.filter(function(task) {

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

			return {
				moment: moment(day),
				dayName: moment(day.date).format('dddd'),
				taskList: formattedDay
			}

		});


		var weekJSX = timeStrings.map(function(time, index) {

			var timeRow = weekToDisplay.map(function(day) {

				var hoursTasks = day.taskList.filter(function(task) {

					return task.time == time
				});


				if(hoursTasks[0].tasks.length > 0) {

					return {
						moment: day.moment,
						time: time,
						dayName: day.dayName,
						tasks: hoursTasks[0].tasks,
						holiday: day.taskList[0].holiday
					}

				}
				else {

					return {
						moment: day.moment,
						time: time,
						dayName: day.dayName,
						tasks: [],
						holiday: day.taskList[0].holiday
					}
				}

			
			});

			var jsx = timeRow.map(function(day, index) {

					if(day.time == "All Day" && day.holiday) {

						var holidays = (
							<div className="holidays">
								<h3>{day.holiday}</h3>
							</div>
						)
					}
					else {
						var holidays = '';
					}

					return (
						<li onClick={self.handleSelectDay.bind(null, day)} key={index}>
							{holidays}
							<div className="info">
								<Occasions occasions={day.tasks} filter={self.props.filter} />
								<Tasks tasks={day.tasks} filter={self.props.filter} />
							</div>
						</li>

					)

			});

			return (
					<div key={index} className="time-row">
						<ul>
							<li className="time">{timeRow[0].time}</li>
							{jsx}
						</ul>
					</div>
			)



		});

		

		return (
				<div className="week-view">
					<DisplayHeader caption={caption} updateAction={this.handleUpdateWeek} />
					<div className="week days-header mdl-layout__header-row mdl-shadow--1dp">
							<ul>
								<li className="time-zone">CDT</li>
								<li>Sunday</li>
								<li>Monday</li>
								<li>Tuesday</li>
								<li>Wednesday</li>
								<li>Thursday</li>
								<li>Friday</li>
								<li>Saturday</li>
							</ul>
					</div>
					<div className="week-display">
						{weekJSX}
					</div>
				</div>

		)
	}
});

module.exports = Week;