import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllStudents } from '../store/students'


export const AllStudents = () => {
    const students = useSelector(store => store.students);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllStudents());
    },[])

  return (
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
  )
}
