import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotFound from './NotFound';
import { SlCalender } from "react-icons/sl";
import './Notification.css'
import NavBar2 from './NavBar2';

export default function Notification() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(localStorage.getItem('userCredential'))._id;

        // Mocking data for testing purposes
        const mockData = [
            {
                companyName: "Tech Corp",
                message: "We have a new opening for a Software Engineer position.",
                date: new Date()
            },
            {
                companyName: "Data Solutions",
                message: "Your application for the Data Analyst role has been reviewed.",
                date: new Date()
            }
        ];
        
        // Simulate an API response with mock data
        axios.get('http://localhost:8080/api/v1/auth/getNotification', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                userId: userId
            }
        })
        .then((res) => {
            // Use mock data instead of the API response for now
            setData(res.data.notifications);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            <NavBar2 />
            <div className="notification-container">
                {data.length === 0 ? (
                    <p><NotFound /></p>
                ) : (
                    data.map((notification, index) => (
                        <div key={index} className='notification-card'>
                            <div className="notification-header">
                                <h3 className="company-name">{notification.companyName}</h3>
                                <SlCalender size={18} color='blue' />
                                <span className="notification-date">{new Date(notification.date).toLocaleDateString()}</span>
                            </div>
                            <div className="notification-body">
                                <p>{notification.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
