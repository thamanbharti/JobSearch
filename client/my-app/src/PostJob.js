import React, { useEffect, useState } from 'react'
import { FaGlobeAmericas } from "react-icons/fa";
import './postjob.css'
import NavBar from './Navbar';
import axios from 'axios';
export default function PostJob() {
  const [jobdetails, setJobdetails] = useState({
    company: "",
    eligibility: "",
    roles: "",
    postedby: "",
    description: ""
  })

  const [applicants, setApplicant] = useState([])

  const postedBy = localStorage.getItem('postedBy');



  const setCompany = (e) => {
    setJobdetails({ ...jobdetails, company: e.target.value });
  }
  const setEligibility = (e) => {
    setJobdetails({ ...jobdetails, eligibility: e.target.value });
  }
  const setRoles = (e) => {
    setJobdetails({ ...jobdetails, roles: e.target.value });
  }
  const setDescription = (e) => {
    setJobdetails({ ...jobdetails, description: e.target.value });
  }

  const token = localStorage.getItem('token');

  axios.get(`http://localhost:8080/api/v1/application/get-resume/${postedBy}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      // Handle the response data here
      setApplicant(response.data.resumeDetail)
      console.log(response.data);
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });

  const handleDownloadResume = (url) => {
    window.open(`${url}`, '_blank');
  };

  return (
    <div className='container'>
      <NavBar />
      <div className='job-applicant'>
        <h2>Applicants</h2>
        {
          applicants.map((applicant, index) => (
            <div className='applicant-card' key={index}>
              <h3>name</h3>
              <button className='apply-button' onClick={() => {
                handleDownloadResume(applicant.resume)

              }}>
                View Resume
              </button>
            </div>
          ))
        }

      </div>
      <div className='card-container-1' style={{ height: 'max-content' }}>
        <div className='job-card'>
          <input className='title' placeholder='Enter company-name' onChange={(e) => setCompany(e)} style={{ color: 'violet', fontWeight: 'bold', cursor: 'pointer' }} />
          <br />
          <input className='title' placeholder='Enter roles' onChange={(e) => setEligibility(e)} style={{ color: 'violet', marginTop: '10px', fontWeight: 'bold', cursor: 'pointer' }} />
          <br />
          <input className='title' placeholder='Enter Eligibility' onChange={(e) => setRoles(e)} style={{ color: 'violet', marginTop: '10px', fontWeight: 'bold', cursor: 'pointer' }} />
          <br />
          <input className='job-description' placeholder='Enter description' onChange={(e) => setDescription(e)} style={{ color: 'violet', marginTop: '10px', width: '45vw', height: '8vh', fontWeight: 'bold', cursor: 'pointer' }} />
          <button className='apply-button' onClick={() => console.log(jobdetails)}>Post</button>
        </div>
      </div>
    </div>
  )
}
