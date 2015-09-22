import React from 'react';

var DisplayHeader = React.createClass({

	handleUpdatePeriod: function(update) {
		this.props.updateAction(update);
	},

	render: function() {

		return (

				<div className="display-header mdl-layout__header-row mdl-shadow--1dp">
					<div className="controls clearfix">
						<button className="left mdl-button mdl-js-button mdl-button--icon" onClick={this.handleUpdatePeriod.bind(null, -1)}>
							<i className="fa fa-arrow-circle-left"></i>
						</button>
						<h2>{this.props.caption}</h2>
						<button className="left mdl-button mdl-js-button mdl-button--icon" onClick={this.handleUpdatePeriod.bind(null, 1)}>
							<i className="fa fa-arrow-circle-right"></i>
						</button>
					</div>				
				</div>
		)
	}
});

module.exports = DisplayHeader;