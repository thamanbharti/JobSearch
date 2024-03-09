import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './login.css';

export default function Register() {
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

  useEffect(()=>{
      setLoading(true);
      setTimeout(()=>setLoading(false),3000);
  },[setLoading])
 



  return (
    <div className="container">
      <div className="screen" >

        <div className="screen__content">
        <h1 style={{color:'black',textAlign:'center'}}>Career<span style={{color:'violet'}}>Grow</span></h1>
          
          <form className="login">
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
            <button className="button login__submit">
              <span className="button__text" >SignUp Now</span>
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
