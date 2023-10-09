import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading';
// import ReactPaginate from 'react-paginate';

export default function Student(props) {

    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    // const [currentPage, setCurrentPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    // const perPage = 2;

    useEffect(() => {
        // axios.get(`http://127.0.0.1:8000/api/students?page=${currentPage + 1}$per_page=${perPage}`)
        axios.get(`http://127.0.0.1:8000/api/students?page=${page}&per_page=${props.pageSize}`)
        .then(res => {
            console.log("API response:",res)
            setStudents(res.data.data);
            setTotalResults(res.data.total);
            setLoading(false);
        }).catch((error) => {
            // Handle errors here
            console.error(error);
            setLoading(false);
          });
    }, [page, props.pageSize]);

    const deleteStudent = (e, id)=>{
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://127.0.0.1:8000/api/students/${id}/delete`).then(res => {
            alert(res.data.message);
            thisClicked.closest("tr").remove();
            // navigate('/students')
            // setLoading(false);
        })

        .catch(function (error) {

            if(error.response.status === 404){
                alert(error.response.data.message)
                thisClicked.innerText = "Delete";
            }
            if(error.response.status === 500){
                alert(error.response.data)
            }

        });

    };

    const handlePrevClick = async () => {
        console.log("Previous");
        setLoading(true);
    
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/students?page=${page - 1}&per_page=${props.pageSize}`);
          console.log(response.data);
    
          setPage(page - 1);
          setStudents(response.data.students);
          setTotalResults(response.data.total);
          setLoading(false);
        } catch (error) {
          // Handle errors here
          console.error(error);
          setLoading(false);
        }
      };

    const handleNextClick = async () => {
        console.log("Previous");
        setLoading(true);
    
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/students?page=${page + 1}&per_page=${props.pageSize}`);
          console.log(response.data);
    
          setPage(page + 1);
          setStudents(response.data.students);
          setTotalResults(response.data.total);
          setLoading(false);
        } catch (error) {
          // Handle errors here
          console.error(error);
          setLoading(false);
        }
      };

      const handlePageChange = (pageNumber) => {
        setLoading(true);
        setPage(pageNumber);
      };

      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(totalResults / props.pageSize); i++) {
        pageNumbers.push(i);
      }

    // const handlePageChange = ({ selected })=>{
    //     setCurrentPage(selected);
    // };

    if(loading){
        return(
            <div>
                <Loading />
            </div>
        )
    };

var studentsDetails =null;
if (students && students.length > 0) {
studentsDetails = students.map( (item, index) => {
    return(
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
                <button type='button' onClick={(e) => deleteStudent(e, item.id) } to="/" className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    )
});
   
}else{
    studentsDetails = (
        <tr>
          <td colSpan="7">No students found.</td>
        </tr>
      );
};

  return (
    <div className="container mt-5" style={{marginBottom: '8%'}}>
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
                        <thead style={{backgroundColor : '#e0e0e0'}}>
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
                            {studentsDetails}
                        </tbody>
                        </table>
                        <div>
      <div className='container d-flex justify-content-between'>
        <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
        <div className="pagination">
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`btn btn-primary ${pageNumber === page ? 'active' : ''}`}
                  >
                    {pageNumber}
                  </button>
                ))};
        </div>
        <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div>
      {/* Render your articles or student data here */}
    </div>

                        {/* <ReactPaginate
                            pageCount={Math.ceil(totalStudents / perPage)}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageChange}
                            containerClassName="pagination"
                            activeClassName="active"
                         /> */}
                         {/* <div className='pagination'>
                            <button onClick={ () => handlePageChange( currentPage - 1 ) } disabled={ currentPage===1 }>
                                Previous
                            </button>
                            <span>Page {currentPage} </span>
                            <button onClick={ () => handlePageChange( currentPage + 1 ) } disabled={ students.length < perPage }>
                                Next
                            </button>
                         </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
