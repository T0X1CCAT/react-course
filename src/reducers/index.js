import {combineReducers}  from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxStatusReducer from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses:courses,
    authors:authors,
    ajaxCallsInProgress: ajaxStatusReducer
});

export default rootReducer;