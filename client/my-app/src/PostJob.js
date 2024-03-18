import React, { useEffect, useState } from 'react';
import './postjob.css';
import NavBar2 from './NavBar2';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostJob() {
    const navigate = useNavigate();
    const postedBy=JSON.parse(localStorage.getItem('userCredential'))._id;
    const [jobDetails, setJobDetails] = useState({
        companyName: "",
        postedBy:postedBy,
        jobTitle: "",
        location: "",
        eligibility: "",
        requirement: "",
        salary: 0,
        description: ""
    });
    const [posting, setPosting] = useState(false);
    const [showApplicants, setShowApplicants] = useState(false);
    const [applicants, setApplicant] = useState([])
    const handleInputChange = (e, field) => {
        setJobDetails({ ...jobDetails, [field]: e.target.value });
    };
    
    
useEffect(()=>{
      
    const token=localStorage.getItem('token');

    axios.get(`http://localhost:8080/api/v1/application/get-resume/${postedBy}`,{
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

},[])
    
        const handleDownloadResume = (url) => {
            window.open(`${url}`, '_blank');
          };


    const handlePostJob = () => {
        setPosting(true);
        axios.post('http://localhost:8080/api/v1/application/create-application',jobDetails)
        .then((res)=>{
          console.log(res.data);
        })
        .catch((err)=>{
          console.log(err);
        })
        setTimeout(() => {
          window.location.reload();
            setPosting(false);
           
        }, 2000);
    };

    return (
        <div className='container'>
            <NavBar2 />

            {showApplicants ? (
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
            ) : (
                <div className='card-container-1' style={{ height: 'max-content' }}>
                    <div className='job-card'>
                        <input className='title' style={{ width: '100%', height: '5vh', marginTop: '2vh', color: 'purple', fontWeight: '900' }} placeholder='Enter company name' onChange={(e) => handleInputChange(e, 'companyName')} />
                        <br />
                        <input className='title' style={{ width: '100%', height: '5vh', marginTop: '2vh', color: 'purple', fontWeight: '900' }} placeholder='Enter job title' onChange={(e) => handleInputChange(e, 'jobTitle')} />
                        <br />
                        <input className='title' style={{ width: '100%', height: '5vh', marginTop: '2vh', color: 'purple', fontWeight: '900' }} placeholder='Enter location' onChange={(e) => handleInputChange(e, 'location')} />
                        <br />
                        <input className='title' style={{ width: '100%', height: '5vh', marginTop: '2vh', color: 'purple', fontWeight: '900' }} placeholder='Enter eligibility' onChange={(e) => handleInputChange(e, 'eligibility')} />
                        <br />
                        <input className='title' style={{ width: '100%', height: '5vh', marginTop: '2vh', color: 'purple', fontWeight: '900' }} placeholder='Enter requirement' onChange={(e) => handleInputChange(e, 'requirement')} />
                        <br />
                        <input className='title' style={{ width: '100%', height: '5vh', marginTop: '2vh', color: 'purple', fontWeight: '900' }} placeholder='Enter salary' type="number" onChange={(e) => handleInputChange(e, 'salary')} />
                        <br />
                        <input className='job-description' style={{ width: '100%', height: '10vh', marginTop: '2vh', color: 'purple', fontWeight: '900' }} placeholder='Enter description' onChange={(e) => handleInputChange(e, 'description')} />
                        <button className='apply-button' onClick={handlePostJob}>Post</button>
                    </div>
                </div>
            )}
            {posting && <CircularProgress style={{ zIndex: '1000', marginLeft: '600px', marginTop: '150px' }} />}
            <div className='toggle-section' style={{ marginLeft: '45%', marginTop: '30%' }}>
                <button className='apply-button' onClick={() =>setShowApplicants(!showApplicants)} style={{ cursor: 'pointer' }}>show Applicants</button>
            </div>
        </div>
    );
}
