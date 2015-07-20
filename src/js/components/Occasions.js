var Occasions = React.createClass({
	render: function() {
		if (this.props.occasions.length > 0) {
			var occasions = this.props.occasions.map(function(occasion){
				if(occasion.category == "occasion") {
					return (
					<h3 className="occasion">{occasion.content}</h3>
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