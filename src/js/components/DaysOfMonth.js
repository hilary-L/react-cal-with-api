var Occasions = require('./Occasions');
var Tasks = require('./Tasks');
var calendarActions = require('../actions/calendarActions');

var DaysOfMonth = React.createClass({
	handleSelectDay: function(day) {
		calendarActions.selectDay(day);
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

				if(day.month != self.props.displayed.month) {
					classes += ' other-month';
				}

				var sortedTasks = day.tasks.sort(function(a, b) {
					return (a.moment.isBefore(b.moment) ? -1 : 1)
				});



				return (<div key={index} className={classes} onClick={self.handleSelectDay.bind(null, day)}>
							<span className="num">{day.dayIndex}</span>
							{holidays}
							<div className="info">
								<Occasions occasions={sortedTasks} filter={self.props.filter}/>
								<Tasks tasks={sortedTasks} filter={self.props.filter}/>
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