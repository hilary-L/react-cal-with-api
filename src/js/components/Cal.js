import React from 'react';
var moment = require('moment-holidays');
var calendarStore = require('../stores/calendarStore');
var calendarActions = require('../actions/calendarActions');
var Calendar = require('node-calendar');
var TaskSearch = require('./TaskSearch');
var View = require('./View');

var Cal = React.createClass({
	getInitialState: function() {
		return ({
			today: calendarStore.getToday(),
			displayed: calendarStore.getDisplayed(),
			selectedDay: calendarStore.getSelected(),
			search: calendarStore.getSearch(),
			events: calendarStore.getEvents()
		})
	},
	componentDidMount: function() {
		this.setState({
			selectedDay: calendarStore.getSelected()
		});
		calendarStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			today: calendarStore.getToday(),
			displayed: calendarStore.getDisplayed(),
			selectedDay: calendarStore.getSelected(),
			search: calendarStore.getSearch(),
			events: calendarStore.getEvents()
		});
	},
	render: function() {
		var calendar = new Calendar.Calendar(Calendar.SUNDAY);

		var calArray = calendar.monthdatescalendar(this.state.displayed.year, this.state.displayed.monthIndex);

		var month = calArray.map(function(item) {

			var week = item.map(function(date) {

				return(
					{
						year: moment(date).year(),
						monthIndex: moment(date).month() + 1,
						month: moment(date).format('MMMM'),
						dayIndex: moment(date).format('D'),
						holiday: moment(date).holiday(),
						date: moment(date),
						time: moment(date).format('h:mm a')
					
					}
				)


			});

			return week;
		
		});

		var events = this.state.events;

		var newDays = month.map(function(week) {

			var newWeek = week.map(function(date) {

				var matchedEvents = events.filter(function(fe) {
					return fe.moment.format('MMMM D YYYY') == date.date.format('MMMM D YYYY');
				});

				return (
					{
						year: date.year,
						monthIndex: date.monthIndex,
						month: date.month,
						dayIndex: date.dayIndex,
						holiday: date.holiday,
						tasks: matchedEvents,
						date: date.date
					}
				)

			});

			return newWeek;

		});


		var view = React.cloneElement(this.props.children, {today: this.state.today, displayed: this.state.displayed, selectedDay: this.state.selectedDay, search: this.state.search, month: newDays});

		return (
			<div className="container">
				<div className="row">
					<div className="view">
						{view}
					</div>
					<div className="task-search">
						<TaskSearch search={this.state.search} days={newDays}/>
					</div>
				</div>
			</div>
		)
	}
});


module.exports = Cal;