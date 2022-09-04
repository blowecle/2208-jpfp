import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCampuses, createCampus } from '../store/campuses'

export const AllCampuses = () => {
    const campuses = useSelector(store => store.campuses);
    const [form, setForm]= useState({
      firstName: "",
      lastName: "",
      email: "",
      gpa: "",
      imgUrl: "",
      campusId: "",
  });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllCampuses());
        setForm({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          gpa: form.gpa,
          imgUrl: form.imgUrl,
          campusId: form.campusId,
      })
    }, [])

    const handleChange = evt => {
      evt.preventDefault();
      setForm({
        ...form,
        [evt.target.name]: evt.target.value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(createCampus({...form}, navigate));
  }

  return (
  <>
    <ul>
      {campuses.map((campus) => {
        return (
          <li key={campus.id}>
            <h2>
              <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
            </h2>
            <img src={campus.imgUrl}/>
            <p>{campus.description}</p>
          </li>
        );
      })}
    </ul>
    <span>
            <form id='campus-form' onSubmit={handleSubmit}>
                <label htmlFor='name'>Campus Name:</label>
                <input onChange={handleChange} name='name' value={form.name} />

                <label htmlFor='address'>Address:</label>
                <input onChange={handleChange} name='address' value={form.address} />

                <label htmlFor='description'>Description:</label>
                <input onChange={handleChange} name='description' value={form.description} />

                <label htmlFor='imgUrl'>Image URL:</label>
                <input onChange={handleChange} name='imgUrl' value={form.imgUrl} />

                <button type='submit'>Add new campus</button>
            </form>
        </span>
  </>
  )
}