import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import studentsReducer from './students';
import campusesReducer from './campuses';
import loggingMiddleware from 'redux-logger';

const rootReducer = combineReducers({
    studentReducer: studentsReducer,
    campusReducer: campusesReducer
})


export default createStore(rootReducer, applyMiddleware(thunk, loggingMiddleware));