import React from 'react';
import Navigation from 'react-router/lib/Navigation';

var calendarActions = require('../actions/calendarActions');
var Month = require('./Month');

var View = React.createClass({

	mixins: [ Navigation ],

	componentDidUpdate: function() {
		componentHandler.upgradeDom();
	},

	handleViewChange: function(route, evt) {

		var path = "cal/view/" + route;

		this.transitionTo(path);

	},

	render: function() {

		var calDisplay = React.cloneElement(this.props.children, {today: this.props.today, displayed: this.props.displayed, selectedDay: this.props.selectedDay, search: this.props.search, month: this.props.month});

		return (
			<div className="mdl-card mdl-shadow--4dp">
				<header className="mdl-layout__header mdl-shadow--4dp">
					<div className="mdl-layout__header-row">
						<button onClick={this.handleViewChange.bind(null, "day")} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">Day</button>
						<button onClick={this.handleViewChange.bind(null, "week")} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">Week</button>
						<button onClick={this.handleViewChange.bind(null, "month")} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">Month</button>
						<button onClick={this.handleViewChange.bind(null, "year")} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">Year</button>
						<div className="mdl-layout-spacer"></div>
						<button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--accent">
							<i className="material-icons">add</i>
						</button>
					</div>
				</header>
				{calDisplay}
			</div>
		)
	}
});

module.exports = View;