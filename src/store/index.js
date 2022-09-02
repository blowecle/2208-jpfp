import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import studentsReducer from './students';
import campusesReducer from './campuses';
import loggingMiddleware from 'redux-logger';

const rootReducer = combineReducers({
    students: studentsReducer,
    campuses: campusesReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk, loggingMiddleware));

export default store;