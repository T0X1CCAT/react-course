import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import Toastr from './../../../node_modules/toastr';


class ManageCoursePage extends React.Component {
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
    this.setState({saving: true});
    Toastr.success('saved :-)');
    this.props.actions.saveCourse(this.state.course).then( () => this.redirect());
    
  }

  redirect(){
    this.setState({saving: false});
    this.context.router.push('/courses');
  }
  updateCourseState(event){
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field]= event.target.value;
    return this.setState({course: course});

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
  const authorsForDropdown = state.authors.map( author => {
    return {
      text: author.lastName,
      value: author.id
    };
  });
  return{
    course: course,
    authors:authorsForDropdown
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
