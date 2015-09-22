import React from 'react';
var calendarActions = require('../actions/calendarActions');
var DisplayHeader = require('./DisplayHeader');
var moment = require('moment');
var Calendar = require('node-calendar');
var Tasks = require('./Tasks');
var Occasions = require('./Occasions');


var Year = React.createClass({

	handleSelectDay: function(day) {
		calendarActions.selectDay(day);
		calendarActions.changeDisplay(day);
	},

	handleUpdateYear: function(update) {

		var displayed = this.props.displayed;

		if (update == 1) {
			var newDate = moment(displayed.date).add(1, 'year');
		}
		else {
			var newDate = moment(displayed.date).subtract(1, 'year');
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

		var calendar = new Calendar.Calendar(Calendar.SUNDAY);
		var self = this;

		var caption = this.props.displayed.year;

		var yearArray = calendar.yeardatescalendar(this.props.displayed.year, 12);

		var formattedYear = yearArray[0].map(function(month, index) {

			var formattedMonth = month.map(function(week) {

				var formattedDay = week.map(function(day) {

					var events = self.props.events.filter(function(task) {

						return moment(day).isSame(task.moment, 'day')
					});

					var classes = "year-day";

					var dayIndex = moment(day).date();

					return (
						{
							date: day,
							month: moment(day).format('MMMM'),
							monthIndex: moment(day).month() + 1,
							dayIndex: moment(day).date(),
							year: moment(day).year(),
							tasks: events

						}

					)
				});

				return formattedDay
			});

			var monthJSX = formattedMonth.map(function(month, index) {

					var dayJSX = month.map(function(day, index) {

						var classes = "year-day";

						if(day.tasks) {

							if(day.tasks.some(function(item) { return item.help == true})) {

								classes += " help";
								if(self.props.filter.helpShown == false) {
									classes += " filtered";
								}
							}
							else if(day.tasks.some(function(item) { return item.category == "task"})) {
								classes += " task";
								if(self.props.filter.needsMetShown == false) {
									classes += " filtered";
								}
							}

							if(day.tasks.some(function(item) { return item.category == "occasion"})) {
								classes += " occasion";
								if(self.props.filter.occasionsShown == false) {
									classes += " filtered";
								}
							}

						}

						if(day.month != formattedMonth[1][1].month) {
							return <li onClick={self.handleSelectDay.bind(null, day)} className="other-month" key={index}>{day.dayIndex}</li>
						}
						else {
							return <li onClick={self.handleSelectDay.bind(null, day)} className={classes} key={index}>{day.dayIndex}</li>
						}

						

					});

				return (
					
						<ul className="year-week" key={index}>
							{dayJSX}
						</ul>

				)

			});

			var monthHeader = formattedMonth[1][1].month;

			return (
				<div className="year-month" key={index}>
					<h4>{monthHeader}</h4>
					<ul className="day-header">
						<li>S</li>
						<li>M</li>
						<li>T</li>
						<li>W</li>
						<li>T</li>
						<li>F</li>
						<li>S</li>
					</ul>
					{monthJSX}
				</div>
			)

		});

	return (
			<div>
				<div>
					<DisplayHeader caption={caption} updateAction={this.handleUpdateYear}/>
					<div className="year-view">
						{formattedYear}
					</div>
				</div>
			</div>
		)
	

	}

});


module.exports = Year;