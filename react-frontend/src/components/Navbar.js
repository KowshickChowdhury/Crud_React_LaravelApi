import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <>

        <nav className="navbar navbar-expand-lg navbar-light"  style={{backgroundColor: '#e3f2fd'}}>
        <div className="container">
            <Link className="navbar-brand" to="/">StudentData</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/students">Students</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/students/search">Search Students</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>

        {/* Display the filtered students */}
      {/* <div className="container mt-4">
        {students.map((student) => (
          <div key={student.id}>
            <p>{student.name}</p>
            <p>{student.course}</p>
            <p>{student.email}</p>
            <p>{student.phone}</p>  */}
            {/* Add more student information as needed */}
          {/* </div> */}
        {/* ))}
       </div> */}
    </>
  )
}
