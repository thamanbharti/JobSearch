import React, { useEffect, useState } from 'react'
import NavBar from './Navbar'
import { Avatar } from '@mui/material'
import './profile.css'
import axios from 'axios'
import { MdOutlineFavoriteBorder,MdOutlineFavorite } from "react-icons/md";
import {  useLocation, useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';

export default function Profile() {
  const navigate=useNavigate();
  const location=useLocation();
  const [favtData,setfavData]=useState([]);
  const [Recruiter,Validate]=useState(false);
  const [user,setUser]=useState({
    username:"",
    email:""
  });
  const [error, setError] = useState(null);
  // console.log(location.state)
   
      
  useEffect(()=>{
    JSON.parse(localStorage.getItem('userCredential'))
    setUser({
      username: JSON.parse(localStorage.getItem('userCredential')).username,
      email: JSON.parse(localStorage.getItem('userCredential')).email
    });
    const userId=JSON.parse(localStorage.getItem('userCredential'))._id;
         
            Validate(Recruiter===localStorage.getItem('userType'))
            

          axios.get(`http://localhost:8080/api/v1/auth/get-favourite/${userId}`)
          .then((res)=>{
            
            for(let i=0;i<res.data.FavouriteItem.length;i++)
            {
                favtData.push(res.data.FavouriteItem[i])
            }
            setfavData(favtData)
            console.log(res.data);
          })
          .catch((err)=>{
            console.log(err);
          })
          
          
  },[])

  
   
    const [show,setShow]=useState(false);
  return (
    <div>
        {/* <NavBar filterdata={filterdata}/> */}
        <NavBar2/>
        <div className='card-container-1'>
            <div className='profile-upper' >
            <Avatar alt="Nemy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: 84, height: 84 }} style={{transform:'translateX(24px) translateY(140px)',cursor:'pointer'}}/>
            </div>
            <div className='profile-lower'>
                <span className='name'>Name</span>
                <span className='edit-name'>{user.username}</span>
                <span className='name'>Email</span>
                <span className='edit-name'>{user.email}</span>
                
                 {
                    !Recruiter?(<button className='fav' onClick={()=>setShow(!show)}>
                    Favourites<MdOutlineFavorite color='red'/></button>):(<button className='fav' onClick={()=>navigate('/postjob')}>
                    PostJob</button>)
                 }
                
                
                <div className='fav-container'>
                {show && favtData.map((favData, index) => (
    <div id="favorites" key={index} style={{ display: "block",marginTop:'5px' }}>
        <p onClick={()=>navigate('/company',{state:{favData:favData}})} style={{cursor:'pointer'}}>{favData.companyName}</p>
    </div>
))}

              

            </div>
        </div>
    </div>
    </div>
  )
}
