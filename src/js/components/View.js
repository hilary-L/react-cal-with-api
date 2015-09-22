import React from 'react';
import Navigation from 'react-router/lib/Navigation';
import moment from 'moment';

var calendarActions = require('../actions/calendarActions');
var Month = require('./Month');

var View = React.createClass({

	mixins: [ Navigation ],

	componentDidMount: function() {

		// Assign link of create event form to the create event button.

		var calendarID = $('#app').data('calendar');
		var link = "/calendar/" + calendarID + "/create-event";
		$('#create-event').attr('href', link);

	},

	componentDidUpdate: function() {
		componentHandler.upgradeDom();

	},

	getInitialState: function() {

		return {
			dayActive: false,
			weekActive: false,
			monthActive: true,
			yearActive: false

		}

	},

	handleSetToday: function(e) {

		var today = {
			date: moment(),
			year: moment().year(),
			month: moment().format('MMMM'),
			monthIndex: moment().month() + 1,
			dayIndex: moment().date(),
			time: moment().format('h:mm a')
		};

		calendarActions.changeDisplay(today);
		calendarActions.selectDay(today);

	},

	handleViewChange: function(route, evt) {

		switch(route) {
			case 'day':
				calendarActions.changeButton({
					dayActive: true,
					weekActive: false,
					monthActive: false,
					yearActive: false
				})
				break;
			case 'week':
				calendarActions.changeButton({
					dayActive: false,
					weekActive: true,
					monthActive: false,
					yearActive: false
				});
				break;
			case 'month':
				calendarActions.changeButton({
					dayActive: false,
					weekActive: false,
					monthActive: true,
					yearActive: false
				});
				break;
			case 'year':
				calendarActions.changeButton({
				dayActive: false,
				weekActive: false,
				monthActive: false,
				yearActive: true
				});
				break;

		}

		if(this.props.displayed.date != this.props.selectedDay.date) {
			calendarActions.changeDisplay(this.props.selectedDay);
		}

		var path = "cal/view/" + route;

		this.transitionTo(path);

	},

	render: function() {

		var calDisplay = React.cloneElement(this.props.children, {today: this.props.today, displayed: this.props.displayed, selectedDay: this.props.selectedDay, search: this.props.search, month: this.props.month, events: this.props.events, filter: this.props.filter});

		var classes = ' mdl-button mdl-js-button lt-sub-btn-md mdl-js-ripple-effect';
		var dayClasses = (this.props.buttonState.dayActive ? 'active' : '') + classes;
		var weekClasses = (this.props.buttonState.weekActive ? 'active' : '') + classes;
		var monthClasses = (this.props.buttonState.monthActive ? 'active' : '') + classes;
		var yearClasses = (this.props.buttonState.yearActive ? 'active': '') + classes;

		return (
			<div className="mdl-card mdl-shadow--2dp">
				<header className="mdl-layout__header cal-top">
					<div className="mdl-layout__header-row">
						<button onClick={this.handleViewChange.bind(null, "day")} className={dayClasses}>Day</button>
						<button onClick={this.handleViewChange.bind(null, "week")} className={weekClasses}>Week</button>
						<button onClick={this.handleViewChange.bind(null, "month")} className={monthClasses}>Month</button>
						<button onClick={this.handleViewChange.bind(null, "year")} className={yearClasses}>Year</button>
						<h6 onClick={this.handleSetToday}>Today</h6>
						<div className="mdl-layout-spacer"></div>
						<a id="create-event"><button className="mdl-button mdl-js-button lt-p-btn-md mdl-js-ripple-effect"><i className="fa fa-plus-circle"></i> Create an Event</button></a>
					</div>
				</header>
				{calDisplay}
			</div>
		)
	}
});

module.exports = View;