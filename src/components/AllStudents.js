import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllStudents, createStudent, deleteStudent } from '../store/students'
import { getAllCampuses } from '../store/campuses'

export const StudentCard = ({student}) => (
  <div className='card'>
    <div className="card-title">
      <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
    </div>
    <img className="card-image" src={student.imgUrl}/>
    <p>E-mail: {student.email}</p>
    <p>GPA: {student.gpa}</p>
  </div>
)

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
    dispatch(createStudent(form, navigate));
  }

  const handleDelete = (student) => () => {
    if(student) {
        dispatch(deleteStudent(student, navigate))
        window.location.reload(false);
    }
}

  return (<>
  <div className="student-main">
    <div className="card-list">
      <ul className='list-style-none'>
        {students.map((student) => {
          return (
            <li key={student.id}>
              <StudentCard student={student}/>
                  <button onClick={handleDelete(student)}>X</button>
            </li>
          );
        })}
      </ul>
    </div>
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
            <option key='null' value={null} name="campusId">-- Select --</option>
                {campuses.map(campus => {
                    return <option key={campus.id} value={campus.id} name="campusId">{campus.name}</option>
                })}
            </select> 
            <button type='submit'>Add New Student</button>
        </form>
      </div>
    </>
  )
}
