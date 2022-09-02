//check, should be similar to SingleStudent
import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllStudents } from '../store/students'
import { getAllCampuses, deleteCampus } from '../store/campuses'

export const SingleCampus = () => {
    const {id} = useParams();
    const campus = useSelector(
        state => state.campuses.find(campus => campus.id == id),
        shallowEqual)
    const students = useSelector(
        state => state.students.filter(student => student.campusId == id),
        shallowEqual
    )

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getAllCampuses());
        dispatch(getAllStudents());
    }, [])

    console.log("Single campus", campus, students)
    
    const handleDelete = (campus) => () => {
        if(campus){
            dispatch(deleteCampus(campus, navigate));
        }
    }
//check
    return (
        <div>
            <button onClick={handleDelete(campus)}>Delete</button>
        </div>
    )
}