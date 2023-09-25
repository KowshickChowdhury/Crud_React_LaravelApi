import React from 'react'

export default function Form() {
  return (
    <div className='container'>
    <h1 className='text-center mt-5'>Create Customer</h1>
        <div className='row mt-5'>
            <div className='col-md-3' style={{    marginLeft: '8rem'}}>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" name="first_name" className="form-label">First Name</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter First Name" />
                </div>
            </div>
            <div className='col-md-3' style={{}}>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                <input type="text" className="form-control" name="last_name" id="exampleFormControlInput1" placeholder="Enter Last Name" />
                </div>
            </div>
            <div className='col-md-3' style={{}}>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                <input type="email" className="form-control" name="email" id="exampleFormControlInput1" placeholder="Enter Your Email" />
                </div>
            </div>
            <div className='col-md-3' style={{marginLeft: '32rem'}}>
                <div style={{marginTop: '30px'}}>
                    <div className="button btn btn-primary">Submit</div>
                </div>
            </div>
        </div>
    </div>
  )
}
