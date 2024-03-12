import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import './login.css';
import { FaGlobeAmericas } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate=useNavigate();
  const [userDetails, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [isLoading, setLoading] = useState(false);

  const emailHandler = (e) => {
    setUser({ ...userDetails, email: e.target.value });
  };

  const userHandler = (e) => {
    setUser({ ...userDetails, username: e.target.value });
  };

  const passwordHandler = (e) => {
    setUser({ ...userDetails, password: e.target.value });
  };

 
 
  const postUser = (e) => {
    e.preventDefault(); 
    setLoading(true);
    console.log(userDetails)
    axios.post('http://localhost:8080/api/v1/auth/register', userDetails)
      .then((res) => {
        if(res.data.success===true)
        navigate('/login');
        console.log(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        // setError("Registration failed. Please try again."); // Set error state
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  



  return (
    <div className="container">
      <div className="screen" >

        <div className="screen__content">
        <h1 style={{color:'black',textAlign:'center'}}>CareerGrow<FaGlobeAmericas color='purple'/></h1>
          
          <form className="login"  onSubmit={(e) => postUser(e)}>
          {isLoading?<CircularProgress style={{zIndex:'1000',marginLeft:'200px'}}/>:""} 
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder=" Email" onChange={(e) => emailHandler(e)} />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder="UserName" onChange={(e) => userHandler(e)} />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="Password" onChange={(e) => passwordHandler(e)} />
            </div>
            <button className="button login__submit" >
              <span className="button__text" type="submit" onSubmit={(e)=>postUser(e)}>SignUp Now</span>
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
  );
}
