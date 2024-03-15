import React, { useEffect, useRef, useState } from 'react';
import './main.css';
import { FaFilter } from "react-icons/fa";
import Popup from 'reactjs-popup';
import axios from 'axios';
import { MdOutlineFavoriteBorder,MdOutlineFavorite } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaGlobeAmericas } from "react-icons/fa";
import NavBar from './Navbar';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { FaHome } from "react-icons/fa";
import LoremIpsum from 'react-lorem-ipsum';
import Upload from './Upload';
import { useLocation, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';

export default function Main() {
  const location=useLocation();
  const userId=location.state?.userId;
  const dummyJobData = [
    {
      id: 1,
      Company: 'ABC Tech Solutions',
      jobProfile: 'Software Engineer',
      description: 'We are seeking a talented software engineer...',
      eligibility: 'Bachelor\'s degree in Computer Science...',
      Location: 'San Francisco, CA',
    },
    {
      id: 2,
      Company: 'XYZ Marketing Agency',
      jobProfile: 'Digital Marketing Specialist',
      description: 'Join our marketing team and help drive digital campaigns...',
      eligibility: 'Bachelor\'s degree in Marketing or related field...',
      Location: 'New York, NY',
    },
    {
      id: 3,
      Company: 'Tech Innovators Inc.',
      jobProfile: 'Data Scientist',
      description: 'Exciting opportunity for a data scientist to work on cutting-edge projects...',
      eligibility: 'Master\'s degree in Data Science or equivalent experience...',
      Location: 'Seattle, WA',
    },
    {
      id: 1,
      Company: "AI Solutions Co.",
      jobProfile: "Machine Learning Engineer",
      description: "Join our team to develop state-of-the-art machine learning algorithms...",
      eligibility: "Bachelor's degree in Computer Science or related field...",
      Location: "San Francisco, CA"
    },
    {
      id: 2,
      Company: "Data Analytics Corp.",
      jobProfile: "Business Analyst",
      description: "Seeking a skilled business analyst to analyze and interpret data...",
      eligibility: "Bachelor's degree in Business Administration or relevant field...",
      Location: "New York, NY"
    },
    {
      id: 4,
      Company: "Tech Solutions Ltd.",
      jobProfile: "Software Engineer",
      description: "Exciting opportunity for a software engineer to develop innovative solutions...",
      eligibility: "Bachelor's degree in Computer Science or equivalent experience...",
      Location: "Austin, TX"
    }

  ];
  const [likedpost,setLikedPost]=useState({
    companyName:"",
    _id:"",
    
  });
   const [Filter,selectFilter]=useState("");
   const [search,setSearch]=useState("");
  const [show, setShow] = useState(false);
  const [liked,setLiked]=useState([
    false
  ]);
  const [data,setData]=useState(dummyJobData);
  const toggleFilterBox = () => {
    setShow(!show);
  };


  useEffect(()=>{
        for(let i=0;i<liked.length;i++)
        {
           if(liked[i]===true)
           {
             
              likedpost.companyName=dummyJobData[i].Company;
              likedpost.user_id=localStorage.getItem('userId');
              axios.post('http://localhost:8080/api/v1/auth/favourite',likedpost)
              .then((res)=>{
                console.log(res.data)
              })
              .catch((err)=>{
                console.log(err);
              })
           }
        }
        // console.log(likedpost.length)
        console.log(likedpost)
        
  },[liked])

  const styleProps = {
    display: show ? 'block' : 'none',    
    animation: show ? 'appear 1s forwards' : 'none',
  };
     
 
  
  
   const handleSearchData=(searchdata)=>{
       setSearch(
        searchdata)
   }

   useEffect(() => {
    console.log("inside useEffect");
    console.log(Filter);
  
    
    if (search !== "" && Filter !== "") {
      setData(dummyJobData.filter((job) => job[Filter].replace(/\s+/g, '').toLowerCase() === search.replace(/\s+/g, '').toLowerCase()));
    }
  }, [search, Filter]);
         

     console.log("search->",search);

  const listItemStyle = {
    
    listStyleType: 'none',
    margin: '5px 0',
    padding: '8px',
   
    borderRadius: '3px',
    cursor: 'pointer',
    fontWeight:'bold',
    backgroundColor: '#f0f0f0'
  };
  
  const handlesetLiked=(index)=>{
      const duplicate=[...liked];
      duplicate[index]=!duplicate[index];
      setLiked(duplicate) 
    }




  const filterdata={
    toggleFilterBox:toggleFilterBox,
    Filter:Filter,
    handleSearchData:handleSearchData
  }

  const filters=["Company","eligibility","Location","jobProfie"];

  return (
    <div className='container'>
   
        <NavBar filterdata={filterdata} />

     
      <div className='filter-box' style={styleProps}>

      
    
      {
        filters.map((filter,index)=> (
          <li style={listItemStyle} 
         key={index} onClick={()=>selectFilter(filter)} >{filter}</li>
        ))
      }


    </div>
      <div className='card-container-1'>
      {
        data.length?data.map((data,index)=>(
          <div className='job-card' key={index}>
     
    <div className="details">

      <div className="company-name">{data.Company}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<SlCalender size={15} color='blue' style={{float:'right',marginRight:'5px'}}/></div>
      <div className="job-role">{data.jobProfile}&nbsp;&nbsp;{data.Location}</div>
      <div className="job-description">{data.description}<LoremIpsum/></div>
      <Popup trigger={<button className="apply-button">Apply Now</button>} position={' center'}>
          <Upload/>
    </Popup>
      <span style={{fontSize:'60%',marginLeft:'15vw'}}>eligibility{data.eligibility}</span>
      {liked[index]?<MdOutlineFavorite key={index} onClick={()=>handlesetLiked(index)} color='red' style={{float:'right',marginTop:'10px',marginRight:'5px',cursor:'pointer'}}/>:<MdOutlineFavoriteBorder onClick={()=>handlesetLiked(index)} style={{float:'right',marginTop:'10px',marginRight:'5px',cursor:'pointer'}}/>}
      </div>
      </div>
   
        )):<NotFound/>
      }


      </div>
    
    </div>
  );
}
