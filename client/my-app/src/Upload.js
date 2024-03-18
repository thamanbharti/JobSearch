import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";

export default function Upload({postedBy,applyBy,applicationIdBy}) {
    const UploadStyle = {
        width: '60vw',
        height: '50vh',
        backgroundColor: 'black',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        zIndex: '20000',
    };


    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      console.log(postedBy,applicationIdBy,applyBy)
      setFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!file) {
        alert('Please select a file');
        return;
      }
  
      const formData = new FormData();
     
      const userId=localStorage.getItem('userCredential')._id;
   

      formData.append('file', file);
      formData.append('applyBy', applyBy);
      formData.append('applicationIdBy', applicationIdBy);
      formData.append('postedBy', postedBy);
  
      try {
        await axios.post('http://localhost:8080/api/v1/upload-resume', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('File uploaded successfully');
      } catch (error) {
        console.log(formData)
        alert('Error uploading file');
        console.error('Error:', error);
      }
    };


    return (
        <div style={UploadStyle}>
          <form onSubmit={handleSubmit}>
        <label htmlFor="file">Select file:</label>
        <input type="file" name="file" id="file" onChange={handleFileChange} className='apply-button'/><br /><br />
        <input type="submit" value="UploadResume" style={{transform:'translateX(100%)'}}className='apply-button'/>
        </form>
            
            <IoMdCloudUpload size={200} color='grey' style={{ opacity: '.5' }} />
        </div>
    );
}
