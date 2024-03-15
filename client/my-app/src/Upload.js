import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
export default function Upload({ userId, index, postedBy }) {
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
    Zindex: '20000',
    backgroundColor: 'black'
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log(index.postedBy)
    formData.append('userId', userId);
    formData.append('index', index);
    formData.append('postedBy', postedBy);

    try {
      await axios.post('http://localhost:8080/api/v1/application/upload-resume', formData, {
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
        <input type="file" name="file" id="file" onChange={handleFileChange} /><br /><br />
        <input type="submit" value="Upload" />
      </form>
      {/* <button className='apply-button'>

        Upload resume
      </button> */}
      {/* <IoMdCloudUpload size={200} color='grey' style={{ marginLeft: '5%', opacity: '.5' }} /> */}
    </div>
  )
}
