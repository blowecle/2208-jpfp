import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllStudents, createStudent } from '../store/students'
import { getAllCampuses } from '../store/campuses'

export const AllStudents = () => {
    const students = useSelector(store => store.students);
    const campuses = useSelector(state => state.campuses);
    const navigate = useNavigate();

    const dispatch = useDispatch();
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
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          gpa: form.gpa,
          imgUrl: form.imgUrl,
          campusId: form.campusId,
      })
    },[])

    const handleChange = evt => {
      evt.preventDefault();
      setForm({
        ...form,
        [evt.target.name]: evt.target.value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(createStudent({...form}, navigate));
  }

  return (<>
    <ul>
      {students.map((student) => {
        return (
          <li key={student.id}>
            <h2>
              <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
            </h2>
            <img src={student.imgUrl}/>
            <p>E-mail: {student.email}</p>
            <p>GPA: {student.gpa}</p>
          </li>
        );
      })}
    </ul>
      <form id='student-form' onSubmit={handleSubmit}>
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
              {campuses.map(campus => {
                  return <option key={campus.id} value={campus.id} name="campusId">{campus.name}</option>
              })}
          </select> 
          <button type='submit'>Add New Student</button>
      </form>
    </>
  )
}
