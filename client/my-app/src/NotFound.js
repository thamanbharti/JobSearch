import React from 'react'
import { FcEmptyTrash } from "react-icons/fc";
export default function NotFound() {
  return (
    <div className='job-card' style={{backgroundImage:'url(https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png?f=webp)',height:'80vh',border:'none'}}>
        
        <span style={{display: 'block',
  fontSize: '4rem',
  textAlign: 'center',
  fontWeight: 'bold',
  color: 'aqua',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  transform: 'translateY(40vh)',
  marginTop: '20px',
  fontFamily: 'Arial, sans-serif'}}>"Not Found"</span>
           
    </div>
  )
}
