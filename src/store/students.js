import axios from "axios";

//action type constants
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

// action creators
const _createStudent = (student) => {
    return {
        type: CREATE_STUDENT,
        student
    }
}

const _deleteStudent = (student) => {
    return {
        type: DELETE_STUDENT,
        student
    }
}

const _updateStudent = (student) => {
    return {
        type: UPDATE_STUDENT,
        student
    }
}

export const _fetchStudents = (students) => {
    return { 
        type: GET_ALL_STUDENTS, 
        students
    }
}

export const _fetchSingleStudent = (student) => {
    return { 
        type: GET_STUDENT, 
        student
    }
}



//thunk creators
export const getAllStudents = () => {
    return async (dispatch) => {
        const { data: students } = await axios.get('/api/students');
        dispatch(_fetchStudents(students));
    }
}

export const getStudent = (id) => {
    return async (dispatch) => {
        const { data: student } = await axios.get(`/api/students/${id}`);
        dispatch(_fetchSingleStudent(student));
    }
}

export const createStudent = (student, navigate) => {
    return async (dispatch) => {
        const { data: created } = await axios.post('/api/students', student);
        dispatch(_createStudent(created));
        navigate('/students');
    }
}

export const deleteStudent = (student, navigate) => {
    return async (dispatch) => {
        const { data: deleted } = await axios.delete(`/api/students/${student.id}`);
        dispatch(_deleteStudent(deleted));
        navigate('/students');
    }
}

export const editStudent = (student) => {
    console.log(student)
    return async (dispatch) => {
        const { data: edited } = await axios.put(`/api/students/${student.id}`, student);
        dispatch(_updateStudent(edited));
    }
}


export default (state = [], action) => {
    switch(action.type) {
        case GET_ALL_STUDENTS:
            return action.students;
        case GET_STUDENT:
            return action.student;
        case UPDATE_STUDENT:
            return state.map((student) =>
                student.id === action.student.id ? action.student : student
            );
        case DELETE_STUDENT:
            return state.filter((student) => student.id !== action.student.id);
        case CREATE_STUDENT:
            return [...state, action.student];
        default:
            return state;
    }
};