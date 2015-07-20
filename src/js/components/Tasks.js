var Tasks = React.createClass({
	render: function() {
		if (this.props.tasks.length > 0) {
			var tasks = this.props.tasks.map(function(task) {
				var classes = "task"
				if(task.category == "task") {

					if (task.help == true) {
					classes += ' help';
					}
					return (
					<h3 className={classes}>{task.content}</h3>
					)

				}
				
			});

		}
		else {
			var tasks = [];
		}
	
		return (
			<div>
				{tasks}
			</div>
		)
	}
})

module.exports = Tasks;