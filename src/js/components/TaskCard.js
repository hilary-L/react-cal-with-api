import React from 'react';
var moment = require('moment-holidays');
var calendarStore = require('../stores/calendarStore');
var calendarActions = require('../actions/calendarActions');

var TaskCard = React.createClass({
	render: function() {
		/* Background image in task card will be image associated with first task or default picture */

		var self = this;

		var selectedWeek = this.props.events.filter(function(week) {

			var correctWeek =  week.some(function(day, index, array) {
				return (day.dayIndex == self.props.selectedDay.dayIndex && day.month == self.props.selectedDay.month)
			});

			return correctWeek
		});

		var tasks = '';

		if(selectedWeek[0]) {
			var day = selectedWeek[0].filter(function(day) {
				return day.dayIndex == self.props.selectedDay.dayIndex
			});


			var sortedTasks = day[0].tasks.sort(function(a, b) {

				return (a.moment.isBefore(b.moment) ? -1 : 1)

			});


			tasks = sortedTasks.map(function(task, index) {
				var classes = task.category + " clearfix " + task.help;
				return <li className={classes} key={index}><span className="time">{task.hour}</span> {task.content}</li>
			});

		}



		var date = this.props.selectedDay.month + " " + this.props.selectedDay.dayIndex + ", " + this.props.selectedDay.year;
		return (
			<div className="task-card mdl-card mdl-shadow--2dp">
				<div className="mdl-card__title mdl-card--expand">
					<h2 className="mdl-card__title-text">{date}</h2>
				</div>
				<div className="mdl-card__supporting-text">
					<ul>
						{tasks}
					</ul>
				</div>
			</div>
		)

	}
});

module.exports = TaskCard;