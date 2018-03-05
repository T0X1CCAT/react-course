import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import Toastr from './../../../node_modules/toastr';
import {authorsFormattedDropdown} from '../../selectors/selectors';


export class ManageCoursePage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);

  }

  //necessary to run when page is loaded directlry with course id
  componentWillReceiveProps(nextProps){
    if (this.props.course.id != nextProps.course.id){
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  saveCourse(event){
    event.preventDefault();

    if (!this.courseIsValid()){
      return;
    }
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course).
      then( () => this.redirect()).
      catch(error => {
        this.setState({saving: false});
        Toastr.error('error');
      });
    
  }

  redirect(){
    this.setState({saving: false});
        Toastr.success('saved :-)');

    this.context.router.push('/courses');
  }
  updateCourseState(event){
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field]= event.target.value;
    return this.setState({course: course});

  }

  courseIsValid(){
    let formIsValid = true;
    let errors = {};
    if (this.state.course.title.length < 5){
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({errors : errors});
    return formIsValid;
  }
  render(){
    return (
        <CourseForm course={this.state.course} 
                errors={this.state.errors} 
                onSave={this.saveCourse}
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                saving={this.state.saving}/>

    );
  }

}  
ManageCoursePage.propTypes ={
  actions:PropTypes.object.isRequired,
  course:PropTypes.object.isRequired,
  authors:PropTypes.array.isRequired
};

//used to allow access to redirect the router around easiely
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id){
  //filter always returns array
  const course = courses.filter(course => course.id === id);
  if(course.length) return course[0];
  return null;
}
function mapStateToProps(state, ownProps){
  const courseId = ownProps.params.id; //from path /course/:id

  let course = {id:'', watchHref:'', title: '', authorId: '', length: '', category: ''};
  if(courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedDropdown(state.authors)
  };
  
}

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
