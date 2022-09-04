import React, { useEffect, useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getAllStudents, deleteStudent } from '../store/students'
import { getAllCampuses } from '../store/campuses'
import { editStudent } from '../store/students'

export const SingleStudent = () => {
    const {id} = useParams();
    const student = useSelector(
        state => state.students.find(student => student.id == id),
        shallowEqual)
    
    const campuses = useSelector(state => state.campuses)
    
    const campus = useSelector(
        state => state.campuses.find(campus => student != null && campus.id == student.campusId)
    )

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm]= useState({
        firstName: "",
        lastName: "",
        email: "",
        gpa: "",
        imgUrl: "",
        campusId: "",
    });

    useEffect(() => {
        dispatch(getAllStudents());
        dispatch(getAllCampuses());
        setForm({
            firstName: student?.firstName,
            lastName: student?.lastName,
            email: student?.email,
            gpa: student?.gpa,
            imgUrl: student?.imgUrl,
            campusId: student?.campusId,
        })
    }, [])

    const handleChange = evt => {
        evt.preventDefault();
        setForm({
          ...form,
          [evt.target.name]: evt.target.value
      });
    }

    const handleEdit = (evt) => {
        evt.preventDefault();
        dispatch(editStudent({...form, id: student.id}, navigate));
      }

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
                    <h2>E-mail: {student.email}</h2>
                    <h3>GPA: {student.gpa}</h3>
                    {
                        (campus && student.campusId)?(
                            <Link to={`/campuses/${student.campusId}`}>
                                <h4>Attends: {campus.name}</h4>
                            </Link>
                        ):"not assigned a campus"
                    }
                    <span>
                    <form id='student-form' onSubmit={handleEdit}>
                        <label htmlFor='firstName'>First Name:</label>
                        <input onChange={handleChange} name='firstName' value={form.firstName} />

                        <label htmlFor='lastName'>Last Name:</label>
                        <input onChange={handleChange} name='lastName' value={form.lastName} />

                        <label htmlFor='email'>Email:</label>
                        <input onChange={handleChange} name='email' value={form.email} />

                        <label htmlFor='gpa'>Gpa:</label>
                        <input onChange={handleChange} name='gpa' value={form.gpa} />

                        <label htmlFor='imgUrl'>Image URL:</label>
                        <input onChange={handleChange} name='imgUrl' value={form.imgUrl} />

                        <label htmlFor='campusId'>Campus:</label>
                        <select onChange={handleChange} name="campusId" value={form.campusId}>
                        <option key='null' value={null} name="campusId">-- Select --</option>
                            {campuses.map(campus => {
                                return <option key={campus.id} value={campus.id} name="campusId">{campus.name}</option>
                            })}
                        </select> 
                        <button type='submit'>Edit</button>
                    </form>
                    </span>
                    <button onClick={handleDelete(student)}>Delete</button>
                </div>):<h1>Error</h1>}
        </div>
    )
}