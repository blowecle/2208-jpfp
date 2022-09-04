import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCampuses, createCampus } from '../store/campuses'

export const CampusCard = ({campus}) => (
  <div className='card'>
    <div className='card-title'>
      <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
    </div>
    <img className='card-image' src={campus.imgUrl}/>
    <p>{campus.description}</p>
  </div>
)

export const AllCampuses = () => {
    const campuses = useSelector(store => store.campuses);
    const [form, setForm]= useState({
      name: "",
      description: "",
      address: "",
      imgUrl: "",
  });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllCampuses());
        setForm({
          name: form.name,
          description: form.description,
          address: form.address,
          imgUrl: form.imgUrl,
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
    dispatch(createCampus(form, navigate));
  }

  return (
  <>
  <div className="campus-main">
    <div className="card-list">
      <ul className="list-style-none">
        {campuses.map((campus) => {
          return (
            <li key={campus.id}>
              <CampusCard campus={campus}/>
            </li>
          );
        })}
      </ul>
    </div>
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
      </div>
  </>
  )
}