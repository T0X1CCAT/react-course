import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {browserHistory } from 'react-router';


class CoursesPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    // moved to manage course page
    // this.state = {
    //   course: {title:''}
    // };

    // this.onTitleChange = this.onTitleChange.bind(this);
    // this.onClickSave = this.onClickSave.bind(this); 

  }
  courseRow(course, index){
    return <div key={index}>{course.title}</div>;
  }

  //removed and moved to manage courses page
  // onTitleChange(event){
  //   const course = this.state.course;
  //   course.title=event.target.value;
  //   this.setState({course: course}); 
  // }

  // this was removed and put in manage courses
  // onClickSave(){
  //   this.props.actions.createCourse(this.state.course);
  // }

  // the 2nd way
  // onClickSave(){
  //   this.props.createCourse(this.state.course);
  // }

  // the long way to do it
  // onClickSave(){
  //   this.props.dispatch(courseActions.createCourse(this.state.course));
  // }
  
  redirectToAddCoursePage(){
    browserHistory.push('/course');
  }
  
  render() {
    // const {courses} = this.props;
    // return (
    //   <div>
    //     <h1>courses</h1>
    //     <CourseList courses={courses}/>     

    //   </div>
    // );
    const {courses} = this.props;
    return (
      
      <div>
        <h1>Courses</h1>
        <input type="button" className="btn btn-primary"
        onClick={this.redirectToAddCoursePage} value="Add"/>

        <CourseList courses={courses} />
        

      </div>  
    );    

  }
}

CoursesPage.propTypes ={
  courses:PropTypes.array.isRequired
  //actions:PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps){
    return{
      courses:state.courses
    };
}

function mapDispatchToProps(dispatch){
  //third way to do it - bindActionCreators is part of redux and we return the object with the actions key 
  return {
    actions:bindActionCreators(courseActions, dispatch)
  };
  // the 2nd way to do it
  // return {
  //   createCourse: course => dispatch(courseActions.createCourse(course))
  // };
}
//first way - if you want to use dispatch directly
//export default connect(mapStateToProps)(CoursesPage);
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
