import React, { useState } from 'react'
import { FaGlobeAmericas } from "react-icons/fa";
import './postjob.css'
import NavBar from './Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from './AnimatedcheckIcon';
import NavBar2 from './NavBar2';
export default function PostJob() {
    const [jobdetails,setJobdetails]=useState({
        company:"",
        eligibility:"",
        roles:"",
        postedby:"",
        description:"",
        
    })
    const [post,setPost]=useState(false);
 
    const setCompany=(e)=>{
        setJobdetails({...jobdetails,company:e.target.value});
    }
    const setEligibility=(e)=>{
        setJobdetails({...jobdetails,eligibility:e.target.value});
    }
    const setRoles=(e)=>{
        setJobdetails({...jobdetails,roles:e.target.value});
    }
    const setDescription=(e)=>{
        
        setJobdetails({...jobdetails,description:e.target.value});
    }
 
      const handlesetPost=()=>{
        setPost(true);
        setTimeout(()=>setPost(false),2000);
      }

  return (
    <div className='container'>
      <NavBar2/>
     <div className='job-applicant'>
        <h2>Applicants</h2>
        <div  className='applicant-card'>
          <h3>name</h3>
          <button className='apply-button'>
            Download Resume
          </button>
        </div>
     </div>
     {
      !post?  <div className='card-container-1' style={{height:'max-content'}}>
      <div className='job-card'>
          <input className='title' placeholder='Enter company-name' onChange={(e)=>setCompany(e)} style={{color:'violet',fontWeight:'bold',cursor:'pointer'}}/>
          <br/>
          <input className='title' placeholder='Enter roles'  onChange={(e)=>setEligibility(e)} style={{color:'violet',marginTop:'10px',fontWeight:'bold',cursor:'pointer'}}/>
          <br/>
          <input className='title' placeholder='Enter Eligibility'  onChange={(e)=>setRoles(e)}style={{color:'violet',marginTop:'10px',fontWeight:'bold',cursor:'pointer'}}/>
          <br/>
          <input className='job-description' placeholder='Enter description'  onChange={(e)=>setDescription(e)} style={{color:'violet',marginTop:'10px',width:'45vw',height:'8vh',fontWeight:'bold',cursor:'pointer'}}/>
          <button className='apply-button' onClick={()=>handlesetPost()}>Post</button>
      </div>
    </div>:<CircularProgress style={{zIndex:'1000',marginLeft:'400px',marginTop:'100px'}}/>
     }
    
    </div>
  )
}
