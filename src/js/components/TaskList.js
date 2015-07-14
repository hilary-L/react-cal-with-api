var React = require('react');
var Tasks = require('./Tasks');
var Occasions = require('./Occasions');
var calendarActions = require('../actions/calendarActions');

var TaskList = React.createClass({
	componentWillMount: function() {
		calendarActions.selectDay(null, this.props.days[this.props.moment.today])
	},
	render: function() {
		return (
				<div className="task-list-header">
					<h2>List for {this.props.selectedDay.monthName} {this.props.selectedDay.num}</h2>
					<div className="occasions">
						<h2>Occasions</h2>
						<Occasions occasions={this.props.selectedDay.occasions} />
					</div>
					<div className="tasks">
						<h2>Tasks</h2>
						<span className="legend task">Task Filled</span><span className="legend task help">Help Needed</span>
						<Tasks tasks={this.props.selectedDay.tasks} />
					</div>
				</div>
			
		)

	}
})

module.exports = TaskList;