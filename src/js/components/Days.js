var Occasions = require('./Occasions');
var Tasks = require('./Tasks');
var calendarActions = require('../actions/calendarActions');

var Days = React.createClass({
	handleSelectDay: function(index, day) {
		calendarActions.selectDay(index, day);
	},
	render: function() {
		var self = this;
		var days = this.props.days.map(function(day, index) {
			var classes="day";

			if(self.props.moment.todayYear == day.year && self.props.moment.todayMonth == day.monthName && self.props.moment.today == day.num) {
				classes += ' today';
			}

			if (self.props.selectedDay.year == day.year && self.props.selectedDay.monthName == day.monthName && self.props.selectedDay.num == day.num) {
				classes += ' selected';
			}
			if ((index + 1) % 7 == 0) {
				classes += ' last';
			}

			return (<div key={index} className={classes} onClick={self.handleSelectDay.bind(null, index, day)}>
						<span className="num">{day.num}</span>
						<div className="holidays">
							<h3>{day.holiday}</h3>
						</div>
						<div className="info">
							<Occasions occasions={day.occasions}/>
							<Tasks tasks={day.tasks}/>
						</div>
					</div>
				)

		
		});
		return(
			<div>
				{days}
			</div>
		)
	}
});

module.exports = Days;