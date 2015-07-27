import React from 'react';
var calendarActions = require('../actions/calendarActions');
var DisplayHeader = require('./DisplayHeader');
var moment = require('moment');
var Tasks = require('./Tasks');
var Occasions = require('./Occasions');
require('twix');


var Week = React.createClass({

	handleUpdateWeek: function(update) {

		var selected = this.props.selectedDay;

		if (update == 1) {
			var newDate = moment(selected.date).add(7, 'days');
		}
		else {
			var newDate = moment(selected.date).subtract(7, 'days');
		}

		var day = {
			date: newDate,
			year: newDate.year(),
			month: newDate.format('MMMM'),
			monthIndex: newDate.month() + 1,
			weekIndex: newDate.week(),
			dayIndex: newDate.date()
		};

		calendarActions.selectDay(1, day);
	},

	render: function() {

		var dayToMatch = this.props.selectedDay.dayIndex;

		var displayedWeek = this.props.month.filter(function(week) {

			return week.some(function(day) {
				return dayToMatch == day.dayIndex;
			});
		});

		var caption = displayedWeek[0][0].month + ' ' + displayedWeek[0][0].dayIndex + " - " + displayedWeek[0][6].month + " " + displayedWeek[0][6].dayIndex;

		

		var formattedWeek = displayedWeek[0].map(function(weekday) {

				var startTime = moment(weekday.date).add(7, 'hours');

				var times = [];

				for (var i = 0; i <= 14; i++) {
					
					times.push(moment(startTime).add(i, 'hours').format());
				}

				var result = times.map(function(time) {


					if (weekday.tasks.length > 0) {

						var tasksAtTime = weekday.tasks.filter(function(task) {

							return moment(time).twix(moment(time).add(1, 'hours')).contains(task.moment)

							

						});

						return {
							dayName: moment(time).format('dddd'),
							time: moment(time).format('h:mm a'),
							tasks: tasksAtTime,
							holiday: weekday.holiday
						}
					}

					else {

						return {
							dayName: moment(time).format('dddd'),
							time: moment(time).format('h:mm a'),
							tasks: [],
							holiday: weekday.holiday
						}

					}
				});

				return result;

		});

		var timeStrings = ["All Day", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm", "9:00 pm"];

		var fWeek = timeStrings.map(function(time) {

			var timeRow = formattedWeek.map(function(day) {

				if(time == "All Day") {
					return [
						{
							dayName: day[0].dayName,
							time: "All Day",
							tasks: [],
							holiday: day[0].holiday
						}
						]
				}
				else {

					return day.filter(function(times) {

						return times.time == time
					});

				}
			


			});

			return timeRow;

		});

		var weekJSX = fWeek.map(function(time, index) {

			console.log(time);

			var dayBoxes = time.map(function(day, index) {

				if (day[0].time == "All Day" && day[0].holiday) {
					var holidays = (
							<div className="holidays">
								<h3>{day[0].holiday}</h3>
							</div>

					)
				}
				else {
					var holidays = '';
				}

				return (
						<li key={index}>
							{holidays}
							<div className="info">
								<Occasions occasions={day[0].tasks} />
								<Tasks tasks={day[0].tasks} />
							</div>
						</li>

					)
			});

			return (
				<div key={index} className="time-row">
					<ul>
						<li className="time">{time[0][0].time}</li>
						{dayBoxes}
					</ul>
				</div>

			)

		});

		

		return (
				<div className="week-view">
					<DisplayHeader caption={caption} updateAction={this.handleUpdateWeek} />
					<div className="week days-header mdl-layout__header-row mdl-shadow--2dp">
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