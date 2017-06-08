"use strict";

var React = require('react');
var Router = require('react-router');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var CourseForm = require('./CourseForm');
var CourseActions = require('../../actions/courseActions');
var Toastr = require('toastr');
var validUrl = require('valid-url');

var ManageCoursePage = React.createClass({
    statics: {
        willTransitionFrom: function(transition, component) {
            if(component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }          
    },

    mixins: [
        Router.Navigation
    ],

    getInitialState: function() {
        return {
            course: {id: '', title: '', author: [], category: '', length: '', watchHref: ''},
            errors: {},
            dirty: false         
        };
    },

    componentWillMount: function() {
        var courseId = this.props.params.id;
        if(courseId) {
            this.setState({course: CourseStore.getCoursesById(courseId)});
        }
    },

	courseFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {};

		if (this.state.course.title.length < 3) {
			this.state.errors.title = 'Title must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.course.category.length < 3) {
			this.state.errors.category = 'Category must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.course.length.search(":") < 0) {
			this.state.errors.length = 'Length must have format minutes:seconds';
			formIsValid = false;
		}  

		if (!validUrl.isUri(this.state.course.watchHref)) {
			this.state.errors.watchHref = 'It must be an URL';
			formIsValid = false;
		}        

		this.setState({errors: this.state.errors});
		return formIsValid;
    },    

    setCourseState: function(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value; 
        this.state.course[field] = value;
        return this.setState({course: this.state.course});
    },

    setAuthorForCourseState: function(authorId) {
        this.setState({dirty: true});
        var field = 'author';
        var value = this.createAuthorforCourse(authorId);
        this.state.course[field] = value;
        return this.setState({course: this.state.course});
    },

    createAuthorforCourse: function(authorId) {
        var author = AuthorStore.getAuthorById(authorId);
        var authorForCourse = {
            id: author.id,
            name: author.firstName + ' ' + author.lastName
        };
        return authorForCourse;
    },

    isEditMode: function() {
        return this.state.course.id !== '' ? true : false;
    },

    saveCourse: function(event) {
        event.preventDefault();

        if(!this.courseFormIsValid()) { 
            return;
        }
        
        if(this.isEditMode()) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);            
        }

        this.setState({dirty: false});        
        Toastr.success('Course saved.');
        this.transitionTo('courses');
    },

    render: function() {
        return (
            <div>
                <CourseForm 
                    course={this.state.course}
                    onAuthorChange={this.setAuthorForCourseState}
                    onChange={this.setCourseState}
                    onSave={this.saveCourse}
                    isEditMode={this.isEditMode()}
                    errors={this.state.errors}/>
            </div>
        );
    }
});

module.exports = ManageCoursePage;