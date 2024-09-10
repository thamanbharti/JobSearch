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
    password: "",
    userType: "", 
    FirstTime:true,
  });
  const [error, setError] = useState(null);
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

  const userTypeHandler = (e) => { // Handler for userType selection
    setUser({ ...userDetails, userType: e.target.value });
  };

  const postUser = (e) => {
    e.preventDefault(); 
    
    console.log(userDetails)
    if(userDetails.email && userDetails.password && userDetails.userType) // Check if all required fields are filled
    {
      setLoading(true);
      axios.post('http://localhost:8080/api/v1/auth/register', userDetails)
      .then((res) => {
        if(res.data.success === true){
          navigate('/login');
          localStorage.clear();
        }
          
        console.log(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        setError("User already registered"); 
      })
      .finally(() => {
        setLoading(false);
      });
    }
    else {
      setError("Please fill in all fields"); // Error if any required field is missing
    }
  };

  return (
    <div className="container">
      <div className="screen" >
        <div className="screen__content">
          <h1 style={{color:'black',textAlign:'center'}}>CareerGrow<FaGlobeAmericas color='purple'/></h1>
          <form className="login" onSubmit={(e) => postUser(e)}>
            {isLoading ? <CircularProgress style={{zIndex:'1000',marginLeft:'200px'}}/> : ""} 
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder="Email" onChange={(e) => emailHandler(e)} />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder="UserName" onChange={(e) => userHandler(e)} />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="Password" onChange={(e) => passwordHandler(e)} />
            </div>
            <div className="login__field">
              <select className="login__input" onChange={(e) => userTypeHandler(e)}> {/* Dropdown menu for user type selection */}
                <option value="">Select User Type</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">SignUp Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          {error && <h3 style={{ textAlign: 'center', color: 'magenta' }}>{error}</h3>}
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
