import React from 'react';
import Image from '../students.jpg';

export default function Home() {
  return (
    <div className="container" style={{marginBottom: '12%'}}>
      <div className="row">
        <div className="col-md-6">
        <h1 className="mt-5 text-center" style={{color: "green", marginTop:'5%'}}>The Students Data</h1>
          <p>Student data is information gathered about individual students to form a full picture of student learning and needs.
          There are multiple facets to student data tracking, including:
          Academic data
          Social-emotional behavior (SEB) data
          School climate and culture data
          Student data analysis is key to making instruction and intervention decisions that enable all students to succeed in learning. But organizing data and understanding how to analyze it to support your students can be an overwhelming task.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus voluptate provident non ducimus impedit. Assumenda, distinctio sint repellendus ullam dolor autem aliquid odio corrupti laborum eligendi, nobis quidem nemo facilis.</p>
        </div>
      
        <div className="col-md-6 mt-5">
            <img style={{width:'100%'}} src={Image} alt="students" />
        </div>
        </div>
    </div>
  )
}
