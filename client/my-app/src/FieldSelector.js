import React, { useState } from 'react';
import './FieldSelector.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FieldSelector() {
   const navigate = useNavigate();
   const [selected, setSelected] = useState([]);
   const userId = localStorage.getItem('userId');
   const items = [
      'WebDevelopment',
      'AppDevelopment',
      'Consultancy',
      'DataAnalyst',
      'Example',
      'Example',
      'Example',
      'Example',
      'Example',
      'Example'
   ];

   const handleSelect = (e, item) => {
      const isChecked = e.target.checked;
      if (isChecked) {
         setSelected(prevSelected => [...prevSelected, item]);
      } else {
         setSelected(prevSelected => prevSelected.filter(selectedItem => selectedItem !== item));
      }
   };

   const navigateToMain = () => {
      axios.put(`http://localhost:8080/api/v1/auth/current-user/${userId}`, { Interest: selected })
         .then((res) => {
            console.log(res.data.message);
         })
         .catch((err) => {
            console.log(err);
         });

      navigate('/main');
   };

   return (
      <div className='container'>
         <div className='fields'>
            {items.map((item, index) => (
               <li key={index} className='field-1'>
                  {item}
                  <input type='checkbox' onChange={(e) => handleSelect(e, item)} />
               </li>
            ))}
            <h1 style={{ color: 'black', textAlign: 'center', marginTop: '60vh' }}>Select your area of interest</h1>
            <span onClick={navigateToMain} style={{ fontWeight: 'bold', color: 'grey', display: 'inline-block', textAlign: 'center', transform: 'translateX(16vw)', cursor: 'pointer' }}>next&nbsp;{">>"}</span>
         </div>
      </div>
   );
}
