import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar2 from './NavBar2';
import { useNavigate } from 'react-router-dom';

export default function Applicants() {
  const postedBy = JSON.parse(localStorage.getItem('userCredential'))._id;
  const [applicants, setApplicants] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/api/v1/application/get-resume/${postedBy}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setApplicants(response.data.resumeDetail);
        console.log(response.data.resumeDetail);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [postedBy]);

  const handleDownloadResume = (url) => {
    window.open(`${url}`, '_blank');
  };

  const handleViewProfile = (applicant) => {
    // console.log(applicants)
    console.log(applicant)
    const applicantId=applicant.applyBy;
    localStorage.setItem('applicantId',applicantId)
    navigate('/NavigateUser');
    // console.log(applicantId)
  };

  return (
    <div>
      <NavBar2 />
      <div style={styles.container}>
        <h2 style={styles.header}>Applicants</h2>
        {applicants.map((applicant, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.name}>{applicant.applyName}</h3>
            <div style={styles.buttonContainer}>
              <button style={styles.button} onClick={() => handleDownloadResume(applicant.resume)}>
                View Resume
              </button>
              <button style={{ ...styles.button, ...styles.viewProfileButton }} onClick={() => handleViewProfile(applicant)}>
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    margin: '0',
    fontSize: '18px',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  viewProfileButton: {
    backgroundColor: '#28a745', // Different color for the "View Profile" button
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};
