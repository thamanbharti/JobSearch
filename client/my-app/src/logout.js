import React, { useEffect } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';

const Logout = () => {
  const history = useNavigate();

  useEffect(() => {
      localStorage.clear();
    setTimeout(() => {
    
      history('/')
    }, 2000); 
  }, [history]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Successfully Logged Out</h2>
      <p>Redirecting to homepage...</p>
    </div>
  );
};

export default Logout;