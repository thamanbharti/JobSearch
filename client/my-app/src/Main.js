import React, { useState } from 'react';
import './main.css';
import { FaFilter } from "react-icons/fa";
import { MdOutlineFavoriteBorder,MdOutlineFavorite } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoPersonCircleOutline } from 'react-icons/io5';

import LoremIpsum from 'react-lorem-ipsum';

export default function Main() {
  const [show, setShow] = useState(false);
  const [liked,setLiked]=useState(false);
  const toggleFilterBox = () => {
    setShow(!show);
  };

  const styleProps = {
    display: show ? 'block' : 'none',
    // opacity: show ? 1 : 0,
    
    animation: show ? 'appear 1s forwards' : 'none',
  };

  return (
    <div className='container'>
      <h1 >
        &nbsp;&nbsp;CareerGrow{' '}<FaGlobeAmericas color='purple'/>
        <input className='search-bar' placeholder='search' />
        <span className='logo-sec' >
        <FaFilter size={18} style={{cursor:'pointer',marginRight:'40px',marginBottom:'5px'}} onClick={toggleFilterBox}/>
          
        </span>
      </h1>
     
      <div className='filter-box' style={styleProps}>
        <li>filter1</li>
        <li>filter1</li>
        <li>filter1</li>
        <li>filter1</li>
      </div>
      <div className='card-container-1'>
      <div className='job-card'>
      {/* <div className="icon">[Icon Here]</div> */}
    <div className="details">

      <div className="company-name">Company Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<SlCalender size={15} color='blue' style={{float:'right',marginRight:'5px'}}/></div>
      <div className="job-role">Job Role</div>
      <div className="job-description"><LoremIpsum avgSentencesPerParagraph={2} p={4}/></div>
      <button className="apply-button">Apply Now</button><span style={{fontSize:'60%',marginLeft:'15vw'}}>posted by</span>
      {liked?<MdOutlineFavorite onClick={()=>setLiked(!liked)} color='red' style={{float:'right',marginTop:'10px',marginRight:'5px',cursor:'pointer'}}/>:<MdOutlineFavoriteBorder onClick={()=>setLiked(!liked)} style={{float:'right',marginTop:'10px',marginRight:'5px',cursor:'pointer'}}/>}
      </div>
      </div>
    </div>
    </div>
  );
}
