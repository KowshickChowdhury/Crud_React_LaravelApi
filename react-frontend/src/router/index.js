import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import StudentList from '../pages/Student';
import StudentCreate from '../pages/StudentCreate';
import StudentEdit from '../pages/StudentEdit';
import { Routes, Route } from 'react-router-dom';
import SearchedStudent from '../pages/SearchedStudent';

export default function MyRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/students' element={<StudentList />}></Route>
        <Route path='/students/create' element={<StudentCreate />}></Route>
        <Route path='/students/:id/edit' element={<StudentEdit />}></Route>
        <Route path='/students/search' element={<SearchedStudent />}></Route>
    </Routes>
  )
}
