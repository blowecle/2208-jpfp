import React, { useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getAllStudents, deleteStudent } from '../store/students'
import { getAllCampuses } from '../store/campuses'

export const SingleStudent = () => {
    const {id} = useParams();
    const student = useSelector(
        state => state.students.find(student => student.id == id),
        shallowEqual)
    const campus = useSelector(
        state => state.campuses.find(campus => student != null && campus.id == student.campusId)
    )
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllStudents());
        dispatch(getAllCampuses());
    }, [dispatch])

    console.log(student?.id, (campus != null)?campus.id:"unknown")

    const handleDelete = (student) => () => {
        if(student) {
            dispatch(deleteStudent(student, navigate))
        }
    }
        

    return (
        <div>
            {(student)?(
                <div>
                    <h1>{student.firstName} {student.lastName}</h1>
                    <img src={student.imgUrl}></img>
                    <h2>{student.email}</h2>
                    <h3>{student.gpa}</h3>
                    {
                        (campus && student.campusId)?(
                            <Link to={`/campuses/${student.campusId}`}>
                                <h4>Attends: {campus.name}</h4>
                            </Link>
                        ):"not assigned a campus"
                    }
                    <button onClick={handleDelete(student)}>Delete</button>
                </div>):<h1>Error</h1>}
        </div>
    )
}