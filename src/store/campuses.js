import axios from "axios";

//action type constants
const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
// const SET_CampusS = 'SET_CampusS';
// const SET_Campus = 'SET_Campus';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

//action creators
const _createCampus = (campus) => {
    return {
        type: CREATE_CAMPUS,
        campus
    }
}

const _deleteCampus = (campus) => {
    return {
        type: DELETE_CAMPUS,
        campus
    }
}

const _updateCampus = (campus) => {
    return {
        type: UPDATE_CAMPUS,
        campus
    }
}

export const _fetchCampuses = () => {
    return { 
        type: GET_ALL_CAMPUSES, 
        campuses
    }
}

export const _fetchSingleCampus = () => {
    return { 
        type: GET_CAMPUS, 
        campus
    }
}

//thunk creators
export const getAllCampuses = () => {
    return async (dispatch) => {
        const { data: campuses } = await axios.get('/api/campuses');
        dispatch(_fetchCampuses(campuses));
    }
}

export const getCampus = (id) => {
    return async (dispatch) => {
        const { data: campus } = await axios.get(`/api/campuses/${id}`);
        dispatch(_fetchSingleCampus(campus));
    }
}

export const createCampus = (campus, history) => {
    return async (dispatch) => {
        const { data: created } = await axios.post('/api/campuses', campus);
        dispatch(_createCampus(created));
        history.push('/')
    }
}

export const deleteCampus = (campus, history) => {
    return async (dispatch) => {
        const { data: deleted } = await axios.delete(`/api/campuses/${campus.id}`);
        dispatch(_deleteCampus(deleted));
        history.push('/');
    }
}

export const editCampus = (campus, history) => {
    return async (dispatch) => {
        const { data: edited } = await axios.put(`/api/campuses/${campus.id}`, campus);
        dispatch(_updateCampus(edited));
        history.push('/');
    }
}

export default function campusesReducer(state = [], action){
    switch(action.type) {
        case GET_ALL_CAMPUSES:
            return action.campuses;
        case GET_CAMPUS:
            return action.campus;
        case UPDATE_CAMPUS:
            return state.map((campus) =>
                campus.id === action.campus.id ? action.campus : campus
            );
        case DELETE_CAMPUS:
            return state.filter((campus) => campus.id !== action.campus.id);
        case CREATE_CAMPUS:
            return [...state, action.campus];
        default:
            return state;
    }
};