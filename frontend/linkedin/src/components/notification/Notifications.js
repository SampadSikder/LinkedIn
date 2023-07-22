import React, { useState, useEffect } from 'react';
import axios from '../../Axios/axios';

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        try {
            const response = await axios.get('/notifications', config);
            setNotifications(response.data);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchNotifications();
    }, []);

    // const removeNotification = (id) => {
    //     axios.delete(`http://localhost:5050/notifications/${id}`).then((response) => {
    //         console.log(response.data);
    //         fetchNotifications();
    //     }).catch(error => console.log(error));
    // };


    return (
        <div>
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <div
                        key={notification.id}
                        style={{
                            backgroundColor: '#FF4500',
                            border: '1px solid black',
                            padding: '10px',
                            margin: '10px 0',
                        }}
                    >
                        <p style={{ color: 'aliceblue' }}>
                            {notification.notification}</p>
                        {/* <button style={{
                            backgroundColor: '#FF4500',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '5px 10px',
                        }} onClick={() => removeNotification(notification.id)}>Remove</button> */}
                    </div>
                ))
            ) : (
                <p>No notifications available</p>
            )}

        </div>
    );
}

export default Notifications;