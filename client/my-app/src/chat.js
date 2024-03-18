// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import './Chat.css'; // Import your CSS file here

// function Chat() {
//     const [username, setUsername] = useState('');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         // Establish a connection with the server
//         const newSocket = io();
//         setSocket(newSocket);

//         // Ask user to input username
//         do {
//             let enteredUsername = prompt('Please enter your name: ');
//             setUsername(enteredUsername);
//         } while (!username);

//         // Cleanup function
//         return () => {
//             newSocket.disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         // Listen for incoming messages
//         if (socket) {
//             socket.on('message', (msg) => {
//                 setMessages((prevMessages) => [...prevMessages, msg]);
//             });
//         }
//     }, [socket]);

//     const sendMessage = () => {
//         // Send message to the server
//         if (message.trim() !== '' && socket) {
//             socket.emit('message', { username, message });
//             setMessage('');
//         }
//     };

//     return (
//         <section className="chat__section">
//             <div className="brand">
//                 <img height="40" src="/wassup.png" alt="" />
//                 <h1>Chat</h1>
//             </div>
//             <div className="message__area">
//                 {messages.map((msg, index) => (
//                     <div key={index} className="message">
//                         <h4>{msg.username}</h4>
//                         <p>{msg.message}</p>
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <textarea
//                     id="textarea"
//                     cols="30"
//                     rows="1"
//                     placeholder="Write a message..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 ></textarea>
//                 <button onClick={sendMessage}>Send</button>
//             </div>
//         </section>
//     );
// }

// export default Chat;
