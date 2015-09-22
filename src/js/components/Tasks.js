var Tasks = React.createClass({
	render: function() {
		var self = this;
		if (this.props.tasks.length > 0) {
			var tasks = this.props.tasks.map(function(task) {
				if(task.category == "task") {

					if (task.help == true) {
						return (
						<h3 className={self.props.filter.helpShown ? 'task help' : 'task help hidden'}>{task.content}</h3>
						)
					}
					else {
						return (
						<h3 className={self.props.filter.needsMetShown ? 'task' : 'task hidden'}>{task.content}</h3>
						)
					}
				

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