import React from 'react'
import './home.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { LoremIpsum } from 'react-lorem-ipsum';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
export default function Home() {
    const navigate=useNavigate();
  return (
    <div className="container">
        <div className='description' ><h1 style={{textAlign:'center'}}>CareerGrow
        <span>
        <ButtonGroup variant="contained" aria-label="Basic button group" style={{float:'right',borderRadius:'20px',marginRight:'10px',marginTop:'10px'}}>
      <Button style={{backgroundColor:'purple'}} onClick={()=>{navigate('/login')}}>Login</Button>
      <Button style={{backgroundColor:'purple'}} onClick={()=>{navigate('/signup')}}>SignUp</Button>
      </ButtonGroup></span></h1>
      
          <p><h2><span style={{color:'white',fontSize:'50px'}}>"A One think </span><br/><span style={{margin:'60px',fontSize:'30px',color:'white'}}>that matter is skill."</span></h2></p>
        </div>
        <div className='card-container'>
            <div className='card'>
            <LoremIpsum avgWordsPerSentence={'4'} />
            </div>
            <div className='card'>
            <LoremIpsum avgWordsPerSentence={'4'} />
            </div>
            <div className='card'>
            <LoremIpsum avgWordsPerSentence={'4'} />
            </div>
        </div>
    </div>
  )
}
