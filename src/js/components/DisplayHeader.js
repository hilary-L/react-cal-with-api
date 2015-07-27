import React from 'react';

var DisplayHeader = React.createClass({

	handleUpdatePeriod: function(update) {
		this.props.updateAction(update);
	},

	render: function() {

		return (

				<div className="display-header mdl-layout__header-row mdl-shadow--1dp">
					<button className="left mdl-button mdl-js-button mdl-button--icon" onClick={this.handleUpdatePeriod.bind(null, -1)}>
						<i className="material-icons">keyboard_arrow_left</i>
					</button>
					<h2>{this.props.caption}</h2>
					<button className="right mdl-button mdl-js-button mdl-button--icon" onClick={this.handleUpdatePeriod.bind(null, 1)}>
						<i className="material-icons">keyboard_arrow_right</i>
					</button>						
				</div>
		)
	}
});

module.exports = DisplayHeader;