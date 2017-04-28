"use strict";

var React = require('react');
var Input = require('../common/textInput');

var CourseForm = React.createClass({
	propTypes: {
		course: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object						
	},

    render: function() {

		var hiddenStyle = {
			visibility: "hidden"
		};      

        return (
			<form>
				<h1>{this.props.isEditMode ? "Edit Course" : "Add Course"}</h1>
				<Input
					name="title"
					label="Title"
					value={this.props.course.title}
					onChange={this.props.onChange}
					error={this.props.errors.title} />
				<Input
					name="author"
					label="Author"
					value={this.props.course.author.name}
					onChange={this.props.onChange} 
					error={this.props.errors.author} />
				<Input
					name="category"
					label="Category"
					value={this.props.course.category}
					onChange={this.props.onChange} 
					error={this.props.errors.category} /> 
				<Input
					name="length"
					label="Length"
					value={this.props.course.length}
					onChange={this.props.onChange} 
					error={this.props.errors.length} />
				<Input
					style={this.props.isEditMode ? hiddenStyle : {}}
					name="watchHref"
					label="Link to watch"
					value={this.props.course.watchHref}
					onChange={this.props.onChange} 
					error={this.props.errors.watchHref} />  					                                          

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = CourseForm;