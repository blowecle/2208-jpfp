import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from "./store/students";
import { Router } from "express";

const App = () => {
    const students = useSelector(state => state.students);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllStudents());
    },[])

    return(
       <Router>
           <div>testing!</div>
       </Router>
    )
}

export default App;