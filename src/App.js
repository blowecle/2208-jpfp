import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from "./store/students";
import { BrowserRouter , Route, Link, Routes } from "react-router-dom";
import { AllStudents } from "./components/AllStudents";
import { SingleStudent } from "./components/SingleStudent";
import { AllCampuses } from "./components/AllCampuses";
import { SingleCampus } from "./components/SingleCampus"

const App = () => {

    return(
       <BrowserRouter>
           <div id='main'>
               <header className="page-header">
                    <div className="title-text"> Student/College homepage</div>
                    <nav className="nav-bar">
                        <ul className="nav-list">
                            <li className="nav-list-item"><Link to='/students'>Students</Link></li>
                            <li className="nav-list-item"><Link to='/campuses'>Campuses</Link></li>
                        </ul>
                    </nav>
               </header>
               <main className="main-content">
                    <Routes>
                        <Route path='/' />
                        <Route path='/students' element={<AllStudents/>} />
                        <Route path='/students/:id' element={<SingleStudent/>} />
                        <Route path='/campuses' element={<AllCampuses/>} />
                        <Route path='/campuses/:id' element={<SingleCampus/>} />
                    </Routes>
               </main>
           </div>
       </BrowserRouter>
    )
}

export default App;