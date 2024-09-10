import React, { useEffect, useState } from 'react';
import NavBar2 from './NavBar2';
import { Avatar } from '@mui/material';
import axios from 'axios';
import './profile.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";

export default function Profile() {

  const firstChar=JSON.parse(localStorage.getItem('userCredential')).username[0].toUpperCase();

  const [Recruiter, Validate] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    _id: "",
    about:"",
    skill:[]
  });
  const [about, setAbout] = useState("This is a placeholder text for the About section.");
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js", "CSS"]);
  const [editing, setEditing] = useState({ about: false, skills: false });
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    const userCredential = JSON.parse(localStorage.getItem('userCredential'));
    setUser({
      username: userCredential.username,
      email: userCredential.email,
      _id: userCredential._id,
      about:userCredential.About,
      skill:userCredential.Skill
    });
    const userId = userCredential._id;
    console.log(userId)
    Validate('Recruiter' === localStorage.getItem('userType'));
    
    
  }, []);

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSkillsChange = (index, e) => {
    const newSkills = [...skills];
    newSkills[index] = e.target.value;
    setSkills(newSkills);
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };
  const saveChanges = async (section) => {
    try {
      const userCredential = JSON.parse(localStorage.getItem('userCredential'));
      const token = localStorage.getItem('token');  // Retrieve the token from localStorage
      const userId = userCredential._id;
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
  
      if (section === 'about') {
        console.log(Recruiter)
        await axios.put(`http://localhost:8080/api/v1/auth/current-user/${userId}`, { About: about , Recruiter:Recruiter}, config);
      } else if (section === 'skills') {
        await axios.put(`http://localhost:8080/api/v1/auth/current-user/${userId}`, { Skill: skills }, config);
      }
  
      setEditing({ ...editing, [section]: false });
    } catch (error) {
      console.log("Error saving changes:", error);
    }
  };
  

  return (
    <div>
      <NavBar2 />
      <div className='card-container-1'>
        <div className='profile-upper'>
          <Avatar alt="Profile Avatar"  sx={{ width: 84, height: 84 }} >{firstChar}</Avatar>
        </div>
        <div className='profile-lower'>
          <span className='name'>Name</span>
          <span className='edit-name'>{user.username}</span>
          <span className='name'>Email</span>
          <span className='edit-name'>{user.email}</span>
        </div>

        {/* About Section */}
        <div className='section'>
          <h3 className='section-title'>About</h3>
          <div className='section-content'>
            {editing.about ? (
              <div className='editable-content'>
                <textarea
                  className='editable-textarea'
                  value={about}
                  onChange={handleAboutChange}
                />
                <button className='save-button' onClick={() => saveChanges('about')}>Save</button>
              </div>
            ) : (
              <div>
                <p>{user.about}</p>
                <MdEdit className='edit-button' onClick={() => setEditing({ ...editing, about: true })} />
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className='section'>
  {!Recruiter && (
    <>
      <h3 className='section-title'>Skills</h3>
      <div className='section-content'>
        {editing.skills ? (
          <div>
            {skills.map((skill, index) => (
              <div key={index} className='skill-item'>
                <input
                  className='editable-input'
                  type='text'
                  value={skill}
                  onChange={(e) => handleSkillsChange(index, e)}
                />
              </div>
            ))}
            <input
              className='editable-input'
              type='text'
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder='Add new skill'
            />
            <button className='save-button' onClick={handleAddSkill}>Add Skill</button>
            <button className='save-button' onClick={() => saveChanges('skills')}>Save</button>
          </div>
        ) : (
          <div>
            <div className='skills'>
              {skills.map((skill, index) => (
                <div key={index} className='skill-item'>
                  {skill}
                  <MdEdit className='edit-button' onClick={() => setEditing({ ...editing, skills: true })} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )}
</div>
</div>

          
    </div>
  );
}
