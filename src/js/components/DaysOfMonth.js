var Occasions = require('./Occasions');
var Tasks = require('./Tasks');
var calendarActions = require('../actions/calendarActions');

var DaysOfMonth = React.createClass({
	handleSelectDay: function(index, day) {
		calendarActions.selectDay(index, day);
	},
	render: function() {
		var self = this;
		var days = this.props.days.map(function(week) {

			var newWeek = week.map(function(day, index) {

				var classes="day";

				if(self.props.today.year == day.year && self.props.today.month == day.month && self.props.today.dayIndex == day.dayIndex) {
					classes += ' today';
				}

				if (self.props.selectedDay.year == day.year && self.props.selectedDay.month == day.month && self.props.selectedDay.dayIndex == day.dayIndex) {
					classes += ' selected';
				}
				if ((index + 1) % 7 == 0) {
					classes += ' last';
				}

				if(day.holiday) {
					var holidays = (<div className="holidays">
										<h3>{day.holiday}</h3>
									</div>
						)
				}

				return (<div key={index} className={classes} onClick={self.handleSelectDay.bind(null, index, day)}>
							<span className="num">{day.dayIndex}</span>
							{holidays}
							<div className="info">
								<Occasions occasions={day.tasks}/>
								<Tasks tasks={day.tasks}/>
							</div>
						</div>
					)



			});

			return (
					<div className="week">
						{newWeek}
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

module.exports = DaysOfMonth;