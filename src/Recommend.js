import React, { useEffect, useRef, useState } from 'react';
import './main.css';
import { FaFilter } from "react-icons/fa";
import Popup from 'reactjs-popup';
import axios from 'axios';
import { MdOutlineFavoriteBorder,MdOutlineFavorite } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaGlobeAmericas } from "react-icons/fa";
import NavBar2 from './NavBar2';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { FaHome } from "react-icons/fa";
import LoremIpsum from 'react-lorem-ipsum';
import Upload from './Upload';
import { useLocation, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
export default function Recommend() {
    const [recommendedData,setRecommend]=useState([]);
    const listItemStyle = {
    
        listStyleType: 'none',
       
        padding: '8px',
       
        borderRadius: '3px',
        cursor: 'pointer',
        fontWeight:'bold',
        backgroundColor: '#f0f0f0'
      };
      
    useEffect(()=>{
  let Interest=JSON.parse(localStorage.getItem('userCredential')).Interest;

        axios.post('http://localhost:8080/api/v1/recommended',Interest)
        .then((res)=>{
          setRecommend(res.data.recommendedData);
        })
        .catch((err)=>{
          console.log(err);
        })
    },[])
    
  return (
    <div className='container'>
   
        <NavBar2/>

     
    
 
      <div className='card-container-1' >
        <h3>Recommended for you</h3>
      {
        recommendedData.length ? recommendedData.map((data,index) => (
          <div className='job-card' key={index}>
            <div className="details">
              <div className="company-name"><h2>{data.companyName}</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<SlCalender size={15} color='blue' style={{float:'right',marginRight:'5px'}}/></div>
              <div className="job-role">{data.jobTitle}</div>
              <div className="job-description" style={{fontWeight:'500'}}>{data.description}</div>
              <span style={{fontWeight:'bold',fontSize:'large',display:'inline-block'}}>Location:{data.location}</span>
              <br/>  <br/>

            </div>
          </div>
        )) : <NotFound />
        
      }


      </div>
    
    </div>
  )
}
