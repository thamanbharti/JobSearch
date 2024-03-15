import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { FaGlobeAmericas } from "react-icons/fa";
import axios from 'axios';
export default function Login() {
    const [userDetails, setUser] = useState({
        email: "",
        password: ""
      });
      const navigate=useNavigate();
      const [isLoading, setLoading] = useState(false);
    
     const validateUser=(e)=>{
      setLoading(true);
      e.preventDefault(); 
          axios.post('http://localhost:8080/api/v1/auth/login',userDetails)
          .then((res)=>{
            if(res.data.success===true)
            {
              setLoading(false)
              console.log(res.data)
              const userId=res.data.user._id
              localStorage.setItem('userId',userId);
              navigate('/main');
            }
            console.log(res.data);
          })

           
     }
    
      const userHandler = (e) => {
        setUser({ ...userDetails, email: e.target.value });
      };
    
      const passwordHandler = (e) => {
        setUser({ ...userDetails, password: e.target.value });
      };
    
      // useEffect(()=>{
      //     setLoading(true);
      //     setTimeout(()=>setLoading(false),3000);
      // },[setLoading])
  return (
    <div className="container">
      <div className="screen" >

        <div className="screen__content">
        <h1 style={{color:'black',textAlign:'center'}}>CareerGrow<FaGlobeAmericas color='purple'/></h1>
          
          <form className="login" onSubmit={(e) => validateUser(e)}>
          {isLoading?<CircularProgress style={{zIndex:'1000',marginLeft:'200px'}}/>:""} 
           
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder="Email" onChange={(e) => userHandler(e)} />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="Password" onChange={(e) => passwordHandler(e)} />
            </div>
            <button className="button login__submit" >
              <span className="button__text" type="submit" onSubmit={(e)=>validateUser(e)}>Sign In</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  )
}
