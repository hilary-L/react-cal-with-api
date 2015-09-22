var Occasions = React.createClass({

	render: function() {
		var self = this;
		if (this.props.occasions.length > 0) {
			var occasions = this.props.occasions.map(function(occasion){
				if(occasion.category == "occasion") {
					return (
					<h3 className={self.props.filter.occasionsShown ? 'occasion' : 'occasion hidden'}>{occasion.content}</h3>
					)
				}
				
			});
		}
		else {
			var occasions = [];
		}
	
		return (
			<div>
				{occasions}
			</div>
		)
	}
});

module.exports = Occasions;