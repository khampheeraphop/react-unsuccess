import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddStudent from './components/AddStudent';
import Student from './components/Student';
import StudentList from './components/StudentList';

class App extends Component {
  render() {
    return (
      <>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to="/students" className='navbar-brand'>
            University
          </Link>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to="/students" className='nav-link'>
                ค้นหานักศึกษา
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/add" className='nav-link'>
                ใส่ข้อมูลนักศึกษา
              </Link>
            </li>
          </div>
        </nav>

        <div className='container mt-3'>
          <Routes>
            <Route path='/' element={<StudentList />} />
            <Route path='/students' element={<StudentList />} />
            <Route path='/add' element={<AddStudent />} />
            <Route path='/student/:id' element={<Student />} />
          </Routes>
        </div>
      </>
    )
  }
}

export default App;