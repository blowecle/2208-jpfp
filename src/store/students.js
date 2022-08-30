import axios from "axios";
import { initialState } from './index'

const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS'

export const fetchStudents = () => {
    return ({ type: GET_ALL_STUDENTS, students})
}