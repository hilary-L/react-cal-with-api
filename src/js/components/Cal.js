var React = require('react');
var moment = require('moment');
var Month = require('./Month');
var calendarStore = require('../stores/calendarStore');
var calendarActions = require('../actions/calendarActions');

var Cal = React.createClass({
	getInitialState: function() {
		return ({
			moment: calendarStore.getMoment(),
			selectedDay: calendarStore.getSelected(),
			search: calendarStore.getSearch()
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
			search: calendarStore.getSearch()
		});
	},
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div>
						<Month moment={this.state.moment} selectedDay={this.state.selectedDay} search={this.state.search} />
					</div>
				</div>
			</div>
		)
	}
});

React.render(<Cal />, document.getElementById('app'));

module.exports = Cal;