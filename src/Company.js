import React from 'react'
import LoremIpsum from 'react-lorem-ipsum';
import Upload from './Upload';
import { useLocation } from 'react-router-dom'
import { SlCalender } from "react-icons/sl";

import Popup from 'reactjs-popup';
import NavBar2 from './NavBar2';
export default function Company() {
    const location=useLocation();
    const favData=location.state?.favData;
    const listItemStyle = {
    
        listStyleType: 'none',
        margin: '5px 0',
        padding: '8px',
       
        borderRadius: '3px',
        cursor: 'pointer',
        fontWeight:'bold',
        backgroundColor: '#f0f0f0'
      };
console.log(favData)
  return (
    <div>

<NavBar2/>
<div className='job-card' style={{backgroundColor:'white'}}>
     
     <div className="details">
 
       <div className="company-name">{favData.companyName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<SlCalender size={15} color='blue' style={{float:'right',marginRight:'5px'}}/></div>
       <div className="job-role">JobProfile&nbsp;&nbsp;data.Location</div>
       <div className="job-description">data.description<LoremIpsum/></div>
       <Popup trigger={<button className="apply-button">Apply Now</button>} position={' center'}>
           <Upload/>
     </Popup>
       <span style={{fontSize:'60%',marginLeft:'15vw'}}>eligibility data.eligibility</span>
       
       </div>
       </div>
    
           
           
        
    </div>
  )
}
