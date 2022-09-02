//check, should be similar to SingleStudent
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllStudents } from '../store/students'
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

    console.log("Single campus", campus, students)
    
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

//check
    return (
        <div>
            <div>
                <h1>{campus?.name}</h1>
                <div>
                    <img src={campus?.imgUrl}/>
                    <span>
                    <form id='campus-form' onSubmit={handleEdit}>
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
                </div>
                <p>{campus?.description}</p>
            </div>
            <div id="buttons">
                <button onClick={handleDelete(campus)}>Delete Campus</button>
            </div>
        </div>
    )
}