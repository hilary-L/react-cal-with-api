import React from 'react';
var DaysOfMonth = require('./DaysOfMonth');
var calendarActions = require('../actions/calendarActions');
var DisplayHeader = require('./DisplayHeader');

var Month = React.createClass({
	handleUpdateMonth: function(update) {
		calendarActions.updateMonth(update);
	},
	render: function() {

		var caption = this.props.displayed.month + " " + this.props.displayed.year;

		return (
			<div>
				<div className="month-view">
					<DisplayHeader caption={caption} updateAction={this.handleUpdateMonth}/>
					<div className="days-header mdl-layout__header-row mdl-shadow--2dp">
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
					<DaysOfMonth today={this.props.today} displayed={this.props.displayed} days={this.props.month} selectedDay={this.props.selectedDay} />
				</div>
			</div>
		)
	}
});

module.exports = Month;