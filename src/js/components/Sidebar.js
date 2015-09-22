import React from 'react';
import moment from 'moment';
import Navigation from 'react-router/lib/Navigation';
var calendarStore = require('../stores/calendarStore');
var calendarActions = require('../actions/calendarActions');



var Sidebar = React.createClass({

	mixins: [ Navigation ],

	/**
	 * Returns the initial state of the sidebar event list from search, and the error message for an invalid date range.
	 */

	getInitialState: function() {

		return {
			extraListHidden: true,
			moreHidden: true,
			lessHidden: true,
			errorShown: false,
		}

	},
	handleChange: function(e) {
		calendarActions.changeSearch(e.target.value);
		
	},
	handleFilter: function(filter) {
		if (filter == 'helpShown') {
			var filter = {
				helpShown: !this.props.filter.helpShown,
				needsMetShown: this.props.filter.needsMetShown,
				occasionsShown: this.props.filter.occasionsShown
			}
			calendarActions.changeFilter(filter);
		}
		else if (filter == 'needsMetShown') {
			var filter = {
				helpShown: this.props.filter.helpShown,
				needsMetShown: !this.props.filter.needsMetShown,
				occasionsShown: this.props.filter.occasionsShown
			}
			calendarActions.changeFilter(filter);
		}
		else {
			var filter = {
				helpShown: this.props.filter.helpShown,
				needsMetShown: this.props.filter.needsMetShown,
				occasionsShown: !this.props.filter.occasionsShown
			}
			calendarActions.changeFilter(filter);
		}
	},
	handleUpdateDate: function(e) {
		this.props.startDate = e.target.value;
	},
	handleChangeDate: function(e) {
		

		var startDate = React.findDOMNode(this.refs.start).value.trim();
		var endDate = React.findDOMNode(this.refs.end).value.trim();

		if(moment(startDate, 'M/D/YYYY', true).isValid() && moment(endDate, 'M/D/YYYY', true).isValid()) {

			this.setState({
				extraListHidden: this.state.extraListHidden,
				moreHidden: this.state.moreHidden,
				lessHidden: this.state.lessHidden,
				errorShown: false
			});

			var startMoment = moment(startDate);
			var endMoment = moment(endDate);
			
			var start = {
				date: startMoment,
				year: startMoment.year(),
				month: startMoment.format('MMMM'),
				monthIndex: startMoment.month() + 1,
				weekIndex: startMoment.week(),
				dayIndex: startMoment.date(),
				time: startMoment.format('h:mm a')
			};

			calendarActions.changeDisplay(start);

			if (startMoment.isSame(endMoment, 'day')) {

				this.transitionTo("cal/view/day");
				calendarActions.changeButton({
					dayActive: true,
					weekActive: false,
					monthActive: false,
					yearActive: false
				});

			}
			else if (startMoment.isSame(endMoment, 'week')) {

				this.transitionTo("cal/view/week");
				calendarActions.changeButton({
					dayActive: false,
					weekActive: true,
					monthActive: false,
					yearActive: false
				});

			}
			else if (startMoment.isSame(endMoment, 'month')) {

				this.transitionTo("cal/view/month");
				calendarActions.changeButton({
					dayActive: false,
					weekActive: false,
					monthActive: true,
					yearActive: false
				});

			}
			else {

				this.transitionTo("cal/view/year");
				calendarActions.changeButton({
					dayActive: false,
					weekActive: false,
					monthActive: false,
					yearActive: true
				});

			}
			calendarActions.selectDay(start);
			calendarActions.changeDisplay(start)


		}
		else {
			this.setState({
				extraListHidden: this.state.extraListHidden,
				moreHidden: this.state.moreHidden,
				lessHidden: this.state.lessHidden,
				errorShown: true
			});
		}


	},
	handleClick: function(anEvent) {

		var day = anEvent.moment;

		var data = {
			date: day,
			year: day.year(),
			month: day.format('MMMM'),
			monthIndex: day.month() + 1,
			weekIndex: day.week(),
			dayIndex: day.date(),
			time: day.format('h:mm a')
		};

		calendarActions.changeDisplay(data);

		this.transitionTo("cal/view/day");

		calendarActions.changeButton({
					dayActive: true,
					weekActive: false,
					monthActive: false,
					yearActive: false
		});
	},
	handleShow: function(e) {

		this.setState({
			extraListHidden: !this.state.extraListHidden,
			moreHidden: !this.state.moreHidden,
			lessHidden: !this.state.lessHidden
		})
		
	},
	render: function() {

		var search = this.props.search.toLowerCase();
		var clickHandler = this.handleClick;
		var visible = false;
		var viewClass = '';
		var extraListHidden = this.state.extraListHidden;
		var more = this.state.moreHidden;


		if(search.length > 0) {

			var newEventsList = this.props.events.filter(function(anEvent) {

				return anEvent.content.toLowerCase().match(search);
		
			});

			if (newEventsList.length > 0) {



				newEventsList = newEventsList.map(function(anEvent, index) {

					var month = moment(anEvent.moment).format('MMMM');
					var day = moment(anEvent.moment).format('D');
					var year = moment(anEvent.moment).format('YYYY');
					var content = anEvent.content;


					if(index > 5) {
						return (<li className={extraListHidden ? 'hidden' : ''} onClick={clickHandler.bind(null, anEvent)} key={index}>{month} {day}, {year}&#x0003A; {content}</li>)
					}
					else {
						return (<li onClick={clickHandler.bind(null, anEvent)} key={index}>{month} {day}, {year}&#x0003A; {content}</li>)
					}

					

				});

				var visible = true;

			}

			if (newEventsList.length > 5) {
				more = !this.state.moreHidden;
			}



			

		}	


		return (
			<div className="sidebar-bottom mdl-card mdl-shadow--2dp">
				<div className="test-box">
					<h4>Date Range</h4>
					<input type="text" placeholder="1/1/2015" ref="start"/>
					<span>-</span>
					<input type="text" placeholder="1/31/2015" ref="end"/>
					<button onClick={this.handleChangeDate} className="lt-sub-btn-sm">Go</button>
					<small className={this.state.errorShown ? 'error' : 'hidden error'}>Invalid date range</small>
				</div>
				<div className="filter-box">
					<h4>Filter</h4>
					<div className="filter help"><input onChange={this.handleFilter.bind(null, 'helpShown')} defaultChecked="checked" type="checkbox"></input> Help Needed</div>
					<div className="filter needs-met"><input onChange={this.handleFilter.bind(null, 'needsMetShown')} defaultChecked="checked" type="checkbox"></input> Needs Met</div>
					<div className="filter occasions"><input onChange={this.handleFilter.bind(null, 'occasionsShown')} defaultChecked="checked" type="checkbox"></input> Occasions</div>
				</div>
				<div className="search-box">
					<h4>Event Search</h4>
					<input type="text" value={this.props.search} onChange={this.handleChange} placeholder="Search here" />
					<h5 className={visible}>Results</h5>
						<ul>
							{newEventsList}
							<h6 className={more ? 'hidden' : ''} onClick={this.handleShow}>Show more <i className="fa fa-chevron-down"></i></h6>
							<h6 className={this.state.lessHidden ? 'hidden' : ''} onClick={this.handleShow}>Show less <i className="fa fa-chevron-up"></i></h6>
						</ul>
				</div>
			</div>
		)
	}
});

module.exports = Sidebar;