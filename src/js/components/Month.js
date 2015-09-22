import React from 'react';
var DaysOfMonth = require('./DaysOfMonth');
var calendarActions = require('../actions/calendarActions');
var DisplayHeader = require('./DisplayHeader');
var moment = require('moment');

var Month = React.createClass({
	handleUpdateMonth: function(update) {

		var displayed = this.props.displayed;

		if (update == 1) {
			var newDate = moment(displayed.date).add(1, 'month');
		}
		else {
			var newDate = moment(displayed.date).subtract(1, 'month');
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

		var caption = this.props.displayed.month + " " + this.props.displayed.year;

		return (
			<div>
				<div className="month-view">
					<DisplayHeader caption={caption} updateAction={this.handleUpdateMonth}/>
					<div className="days-header mdl-layout__header-row mdl-shadow--1dp">
							<ul>
								<li>Sunday</li>
								<li>Monday</li>
								<li>Tuesday</li>
								<li>Wednesday</li>
								<li>Thursday</li>
								<li>Friday</li>
								<li>Saturday</li>
							</ul>
					</div>
					<DaysOfMonth today={this.props.today} displayed={this.props.displayed} days={this.props.month} selectedDay={this.props.selectedDay} filter={this.props.filter} />
				</div>
			</div>
		)
	}
});

module.exports = Month;