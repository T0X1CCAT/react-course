import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function  courseReducer(state=initialState.courses, action){
    switch(action.type){
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;    
        case types.CREATE_COURSE_SUCCESS:
            return [...state,
                Object.assign({}, action.savedCourse)
            ];
        case types.UPDATE_COURSE_SUCCESS:
            return [
                ...state.filter(course => course.id !== action.savedCourse.id),
                Object.assign({}, action.savedCourse)
            ]        
        default:
            return state;
    }
}