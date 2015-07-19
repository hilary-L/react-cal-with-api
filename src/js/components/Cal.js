import React from 'react';
var moment = require('moment');
var Month = require('./Month');
var calendarStore = require('../stores/calendarStore');
var calendarActions = require('../actions/calendarActions');

var Cal = React.createClass({
	getInitialState: function() {
		return ({
			moment: calendarStore.getMoment(),
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
			moment: calendarStore.getMoment(),
			selectedDay: calendarStore.getSelected(),
			search: calendarStore.getSearch(),
			events: calendarStore.getEvents()
		});
	},
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div>
						<Month moment={this.state.moment} selectedDay={this.state.selectedDay} search={this.state.search} events={this.state.events} />
					</div>
				</div>
			</div>
		)
	}
});


module.exports = Cal;