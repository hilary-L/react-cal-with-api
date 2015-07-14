var React = require('react');
var moment = require('moment-holidays');
var Days = require('./Days');
var TaskList = require('./TaskList');
var TaskSearch = require('./TaskSearch');
var Calendar = require('node-calendar');
var calendarActions = require('../actions/calendarActions');

var Month = React.createClass({
	handleUpdateMonth: function(update) {
		calendarActions.updateMonth(update);
	},
	render: function() {

		var calendar = new Calendar.Calendar(Calendar.SUNDAY);

		var days = calendar.itermonthdates(this.props.moment.year, this.props.moment.num).map(function(item) {
			return(
				{
				year: moment(item).year(),
				monthNum: moment(item).month() + 1,
				monthName: moment(item).format('MMMM'),
				num: moment(item).format('D'),
				holiday: moment(item).holiday(),
				
				}
			)
		});

		var tasks = days.map(function(day, index) {
			if (index % 2 == 0) {
				return( {
					year: day.year,
					monthNum: day.monthNum,
					monthName: day.monthName,
					num: day.num,
					holiday: day.holiday,
					occasions: [],
					tasks: [
						{
							taskName: 'Ride to hockey',
							help: false
						}
					]
				})
			}
			else if (index % 3 == 0 ) {
				return( {
					year: day.year,
					monthNum: day.monthNum,
					monthName: day.monthName,
					num: day.num,
					holiday: day.holiday,
					occasions: [
						{
							occasionName: 'Birthday'
						}
					],
					tasks: [
						{
							taskName: 'Walk the dogs',
							help: false

						},
						{
							taskName: 'Dinner for tonight',
							help: true
						}
					]
				})

			}
			else {
				return ( {
					year: day.year,
					monthNum: day.monthNum,
					monthName: day.monthName,
					num: day.num,
					holiday: day.holiday,
					occasions: [],
					tasks: [
						{
							taskName: 'Doctor appt',
							help: false
						},
						{
							taskName: 'Mow lawn',
							help: true
						}
					]

				})
				
			}
		});

		return (
			<div>
				<div className="month">
					<div className="month-header">
						<span className="left" onClick={this.handleUpdateMonth.bind(null, -1)}>&#171;</span><h2>{this.props.moment.name} &#183; {this.props.moment.year}</h2><span className="right" onClick={this.handleUpdateMonth.bind(null, 1)}>&#187;</span>
					</div>
					<div id="days-header">
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
					<Days moment={this.props.moment} days={tasks} selectedDay={this.props.selectedDay} />
				</div>
				<div className="task-list">
					<TaskList moment={this.props.moment} days={tasks} selectedDay={this.props.selectedDay}/>
				</div>
				<div className="task-search">
					<TaskSearch search={this.props.search} days={tasks}/>
				</div>
			</div>
		)
	}
});

module.exports = Month;