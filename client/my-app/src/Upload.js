import React from 'react'
import { IoMdCloudUpload } from "react-icons/io";
export default function Upload() {
    const UploadStyle = {
        transform: 'translateX(20vw) ',
        width: '40vw',
        paddingLeft: '4px',
        marginbottom: '20px',
        backgroundColor: 'whitesmoke',
        height: '50vh',
        borderRadius: '2px',
        display: 'flex',        
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        Zindex:'20000',
        backgroundColor:'black'
      };
      
  return (
    <div  style={UploadStyle}>
       <button className='apply-button'>
       
        Upload resume
       </button>
       <IoMdCloudUpload size={200} color='grey' style={{marginLeft:'5%',opacity:'.5'}}/>
    </div>
  )
}
