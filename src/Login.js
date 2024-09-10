import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { FaGlobeAmericas } from "react-icons/fa";
import axios from 'axios';

export default function Login() {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null); // State to handle error
    const navigate = useNavigate();
    
    useEffect(()=>{
          if(localStorage.getItem('token')){
            const userCredential = JSON.parse(localStorage.getItem('userCredential'));
            if(userCredential.userType==='Recruiter'){
                navigate('/postjob')
                return ;
            }
            else{
                navigate('/main')
            }
          }
    },[])
    const validateUser = (e) => {
        e.preventDefault();
        if (userDetails.email && userDetails.password) {
            setLoading(true);
            axios.post('http://localhost:8080/api/v1/auth/login', userDetails)
                .then((res) => {
                  const token=res.data.token;
                  localStorage.setItem('token',token);
                  
                          
                  axios.get('http://localhost:8080/api/v1/auth/current-user',{
                     headers:{
                      'Authorization':`Bearer ${token}`
                     }
                  })
                  .then((res)=>{
                      
                             
                      console.log(res.data.success)
                          
                    if (res.data.userData.userType!=='Recruiter'&&res.data.userData.Interest.length === 0) {
                        const userType=res.data.userData.userType;
                        const userCredential=JSON.stringify(res.data.userData);
                       
                       
                        localStorage.setItem('userCredential',userCredential);
                        
                        localStorage.setItem('userType',userType);
                        navigate('/interest');
                    } else if(res.data.success&&res.data.userData.userType!=='Recruiter') {
                        const userType=res.data.userData.userType;
                        const userCredential=JSON.stringify(res.data.userData);
                        console.log(res.data.userData)
                       
                        localStorage.setItem('userCredential',userCredential);
                        
                        localStorage.setItem('userType',userType);
                        navigate('/main');
                    }
                    else if(res.data.success){
                        const userType=res.data.userData.userType;
                        const userCredential=JSON.stringify(res.data.userData);;
                        console.log(userCredential)

                        
                        localStorage.setItem('userCredential',userCredential);
                        localStorage.setItem('userType',userType);
                        navigate('/postjob')
                    }
                     
                      
                  })
                  .catch((err)=>{
                    console.log(err)
                  })


                    setLoading(false);
                    
                   
                })
                .catch((err) => {
                    setLoading(false);
                    // navigate('/postjob')
                    setError("Invalid email or password"); // Update error state
                });
        }
    };

    const handleUserChange = (e) => {
        setUserDetails({ ...userDetails, email: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setUserDetails({ ...userDetails, password: e.target.value });
    };

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <h1 style={{ color: 'black', textAlign: 'center' }}>CareerGrow<FaGlobeAmericas color='purple' /></h1>
                    <form className="login" onSubmit={validateUser}>
                        {isLoading && <CircularProgress style={{ zIndex: '1000', marginLeft: '200px' }} />}
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" className="login__input" placeholder="Email" value={userDetails.email} onChange={handleUserChange} />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Password" value={userDetails.password} onChange={handlePasswordChange} />
                        </div>
                        <button className="button login__submit" type="submit">
                            <span className="button__text">Sign In</span>
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
