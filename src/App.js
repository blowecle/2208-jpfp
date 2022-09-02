import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from "./store/students";
import { BrowserRouter , Route, Link, Routes } from "react-router-dom";
import { AllStudents } from "./components/AllStudents";
import { SingleStudent } from "./components/SingleStudent";
import { AllCampuses } from "./components/AllCampuses";
import { SingleCampus } from "./components/SingleCampus"

const App = () => {
    // const students = useSelector(state => state.students);
    // const campuses = useSelector(state => state.campuses);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllStudents());
    //     dispatch(getAllCampuses());
    // },[])

    return(
       <BrowserRouter>
           <div id='main'>
               <h1>
                   Student/College homepage
               </h1>
               <Link to='/students'>Students</Link>
               <Link to='/campuses'>Campuses</Link>
               <Routes>
                    <Route path='/' />
                    <Route path='/students' element={<AllStudents/>} />
                    <Route path='/students/:id' element={<SingleStudent/>} />
                    <Route path='/campuses' element={<AllCampuses/>} />
                    <Route path='/campuses/:id' element={<SingleCampus/>} />
                </Routes>
           </div>
       </BrowserRouter>
    )
}

export default App;