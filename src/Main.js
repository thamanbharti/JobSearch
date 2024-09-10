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
  const [recommend,handleRecommend]=useState(false);
  const [data,setData]=useState([]);
  const toggleFilterBox = () => {
    setShow(!show);
  };

  useEffect(()=>{
  let Interest=JSON.parse(localStorage.getItem('userCredential')).Interest;
  const userCredential = JSON.parse(localStorage.getItem('userCredential'));
  console.log(userCredential)
    likedpost._id=JSON.parse(localStorage.getItem('userCredential'))._id;
    const token=localStorage.getItem('token')
        axios.get('http://localhost:8080/api/v1/application/get-application',{
          headers:{
            'Authorization':`Bearer ${token}`
           }
        })
        .then((res)=>{
                 console.log(res.data.application[0])
                 let post=[];
                 for(let i=0;i<res.data.application.length;i++)
                 {
                    post.push(res.data.application[i])
                 } 
                 
                 setData(post)
                 console.log(data)
                 console.log(data[0]._id,"->",data[0].postedBy)
        })
        .catch((err)=>{
           console.log(err)
        })
        // axios.post('http://localhost:8080/api/v1/recommended',Interest)
        // .then((res)=>{
        //   console.log(res.data.recommendedData);
        // })
        // .catch((err)=>{
        //   console.log(err);
        // })
        console.log(Interest)

        
        
  },[])





  useEffect(()=>{
        for(let i=0;i<liked.length;i++)
        {
           if(liked[i]===true)
           {

       
              likedpost.companyName=data[i].companyName;
              likedpost.user_id=JSON.parse(localStorage.getItem('userCredential'))._id;
              console.log(likedpost.user_id)
              axios.post('http://localhost:8080/api/v1/auth/favourite',likedpost)
              .then((res)=>{
                console.log(res.data)
              })
              .catch((err)=>{
                console.log(err);
              })
           }
        }
    
        console.log(likedpost)
        
  },[likedpost])

  const styleProps = {
    display: show ? 'block' : 'none',    
    animation: show ? 'appear 1s forwards' : 'none',
    
  };
     

 
  
  
   const handleSearchData=(searchdata)=>{
       setSearch(
        searchdata)
   }

   useEffect(() => {
   
    
    
    if (search !== "" && Filter !== "") {
      // console.log(data[0][Filter])
      setData(data.filter((job) => 
          job[Filter] && job[Filter].replace(/\s+/g, '').toLowerCase() === search.replace(/\s+/g, '').toLowerCase()
      ));
  }
  }, [search, Filter]);
         
  
     console.log("search->",search);

  const listItemStyle = {
    
    listStyleType: 'none',
   
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

  const filters=["companyName","eligibility","location","jobTitle"];

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
 
      <div className='card-container-1' >
      {
        data.length ? data.map((data,index) => (
          <div className='job-card' key={index}>
            <div className="details">
              <div className="company-name"><h2>{data.companyName}</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<SlCalender size={15} color='blue' style={{float:'right',marginRight:'5px'}}/></div>
              <div className="job-role">{data.jobTitle}</div>
              <div className="job-description" style={{fontWeight:'500'}}>{data.description}</div>
              <span style={{fontWeight:'bold',fontSize:'large',display:'inline-block'}}>Location:{data.location}</span>
              <br/>  <br/>
              <Popup trigger={<button className="apply-button">Apply Now</button>} position={' center'}>
                <Upload postedBy={data.postedBy} applyBy={likedpost._id} applicationIdBy={data._id}/>
              </Popup>
              <span style={{fontSize:'70%',marginLeft:'15vw',fontWeight:'bold'}}>Eligibility: {data.eligibility}</span>
              {liked[index] ? <MdOutlineFavorite key={index} onClick={() => handlesetLiked(index)} color='red' style={{float:'right',marginTop:'10px',marginRight:'5px',cursor:'pointer'}}/> : <MdOutlineFavoriteBorder onClick={() => handlesetLiked(index)} style={{float:'right',marginTop:'10px',marginRight:'5px',cursor:'pointer'}}/>}
            </div>
          </div>
        )) : <NotFound />
        
      }


      </div>
    
    </div>
  );
}
