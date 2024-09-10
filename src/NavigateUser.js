import React, { useEffect, useState } from 'react';
import NavBar2 from './NavBar2';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './NavigateUser.css'; // Import a CSS file for additional styling

export default function NavigateUser() {
    const receiverId = localStorage.getItem('applicantId');
    const [user, setUser] = useState({
        username: "",
        email: "",
        about: "",
        skill: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState(null);
    const [messageSuccess, setMessageSuccess] = useState(null);

    useEffect(() => {
        if (receiverId) {
            fetchUserProfile(receiverId);
        } else {
            setError("No user ID provided.");
            setLoading(false);
        }
    }, [receiverId]);

    const fetchUserProfile = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/v1/auth/getClient', {
                params: { userId },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const userData = response.data.userData;
            setUser({
                username: userData.username,
                email: userData.email,
                about: userData.About || "",
                skill: userData.Skill || []
            });
            setLoading(false);
        } catch (err) {
            setError("Error fetching user profile.");
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setMessageError(null);
        setMessageSuccess(null);

        if (!message.trim()) {
            setMessageError("Message cannot be empty.");
            return;
        }

        try {
            const userCredential = JSON.parse(localStorage.getItem('userCredential'));
            const companyName = userCredential.username;
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8080/api/v1/auth/postNotification', {
                receiverId,
                message,
                companyName
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMessageSuccess("Message sent successfully!");
            setMessage(""); // Clear the message input
        } catch (err) {
            setMessageError("Failed to send message. Please try again.");
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="navigate-user">
            <NavBar2 />
            <div className='profile-container'>
                <h2 className="profile-header">{user.username}'s Profile</h2>
                <div className="profile-details">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>About:</strong> {user.about}</p>
                    <p><strong>Skills:</strong> {user.skill.join(', ')}</p>
                </div>
            </div>

            <div className='message-section'>
                <h3>Leave a Message for {user.username}</h3>
                <form onSubmit={handleSendMessage}>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message here..."
                        rows="5"
                        className="message-textarea"
                    />
                    <button type="submit" className="send-button">Send Message</button>
                </form>

                {messageError && <p className="message-error">{messageError}</p>}
                {messageSuccess && <p className="message-success">{messageSuccess}</p>}
            </div>
        </div>
    );
}
