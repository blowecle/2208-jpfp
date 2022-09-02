import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCampuses } from '../store/campuses'

export const AllCampuses = () => {
    const campuses = useSelector(store => store.campuses);
    // console.log({campuses})
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCampuses());
    }, [])

  return (
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
  )
}