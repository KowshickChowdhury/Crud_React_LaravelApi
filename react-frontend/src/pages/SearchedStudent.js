import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export default function SearchedStudent() {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState([]);

  const handleInput = async (e) => {
    const key = e.target.value;
    console.log(key);

    setLoading(true); // Set loading to true while fetching data

    axios.get(`http://127.0.0.1:8000/api/students/search/${key}`)
      .then(res => {
        console.log(res);
        setStudent(res.data.student);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(function (error) {
        if (error.response && error.response.status === 404) {
          alert(error.response.data.message);
        } else if (error.response && error.response.status === 500) {
          alert(error.response.data);
        } else {
          console.error(error);
        }
        setLoading(false); // Set loading to false on error
      });
  }

  const deleteStudent = (e, id) => {
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    axios.delete(`http://127.0.0.1:8000/api/students/${id}/delete`).then(res => {
      alert(res.data.message);
      thisClicked.closest("tr").remove();
    })
    .catch(function (error) {
      if (error.response && error.response.status === 404) {
        alert(error.response.data.message);
      } else if (error.response && error.response.status === 500) {
        alert(error.response.data);
      } else {
        console.error(error);
      }
    });
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <div className="col-sm-6 offset-sm-3">
      <h1>Search Students</h1>
      <input type="text" className='form-control' onChange={handleInput} />

      <div className="container mt-5" style={{ marginBottom: '8%' }}>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Students List
                  <Link to="/students/create" className='btn btn-primary float-end'>Add Student</Link>
                </h4>
              </div>
              <div className="card-body">
                
                  <table className="table table-striped table-bordered">
                    <thead style={{ backgroundColor: '#e0e0e0' }}>
                      <tr className='text-center'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                      {student.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.course}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>
                            <Link to={`/students/${item.id}/edit`} className='btn btn-primary'>Edit</Link>
                          </td>
                          <td>
                            <button type='button' onClick={(e) => deleteStudent(e, item.id)} to="/" className='btn btn-danger'>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <p>No student data available.</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}