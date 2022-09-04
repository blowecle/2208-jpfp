//check, should be similar to SingleStudent
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getAllStudents, editStudent } from '../store/students'
import { getAllCampuses, deleteCampus, editCampus } from '../store/campuses'

export const SingleCampus = () => {
    const {id} = useParams();
    const campus = useSelector(
        state => state.campuses.find(campus => campus.id == id),
        shallowEqual)
    const students = useSelector(
        state => state.students.filter(student => student.campusId == id),
        shallowEqual)

    const [form, setForm]= useState({
        name: "",
        address: "",
        description: "",
        imgUrl: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getAllCampuses());
        dispatch(getAllStudents());
        setForm({
            name: campus?.name,
            address: campus?.address,
            description: campus?.description,
            imgUrl: campus?.imgUrl,
        })
    }, [])
    
    const handleDelete = (campus) => () => {
        if(campus){
            dispatch(deleteCampus(campus, navigate));
        }
    }

    const handleChange = evt => {
        evt.preventDefault();
        setForm({
          ...form,
          [evt.target.name]: evt.target.value
      });
    }

    const handleEdit = (evt) => {
        evt.preventDefault();
        
        dispatch(editCampus({...form, id: campus.id}, navigate));
      }

    const unenrollStudent = (evt) => {
        const student = students.find(student => student.id == evt.target.value)
        student.campusId = null;
        dispatch(editStudent({...student, id: evt.target.value}, navigate))
    }
    

//check
    return (
        <div>
            <div className='card'>
                <div className='card-title'>{campus?.name}</div>
                <div>
                    <img className='card-image' src={campus?.imgUrl}/>
                    </div>
                        <div className='card-info'>{campus?.description}</div>
                        <ul>Enrollees: 
      {students.map((student) => {
        return (
          <li key={student.id}>
            <h4>
              <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
              <button value={student.id} onClick={unenrollStudent}>Unregister</button>
            </h4>
          </li>
        );
      })}
    </ul>
        </div>
        <span>
        <form id='form' onSubmit={handleEdit}>
            <label htmlFor='name'>Campus Name:</label>
            <input onChange={handleChange} name='name' value={form.name} />

            <label htmlFor='address'>Address:</label>
            <input onChange={handleChange} name='address' value={form.address} />

            <label htmlFor='description'>Description:</label>
            <input onChange={handleChange} name='description' value={form.description} />

            <label htmlFor='imgUrl'>Image URL:</label>
            <input onChange={handleChange} name='imgUrl' value={form.imgUrl} />

            <button type='submit'>Edit</button>
        </form>
        </span>
            <div id="buttons">
                <button onClick={handleDelete(campus)}>Delete Campus</button>
            </div>
        </div>
    )
}