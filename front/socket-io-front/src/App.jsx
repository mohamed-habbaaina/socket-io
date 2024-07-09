import { useEffect, useRef, useState } from 'react';
import './App.css';
import socketEnv from "./connection";

function App() {
  const socketRef = useRef(socketEnv);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Gérer la connexion
    socketRef.current.on('connect', () => {
      console.log('User connected :', socketRef.current.id);
    });

    // Gérer les messages de chat
    socketRef.current.on('chat message', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Gérer la déconnexion
    socketRef.current.on('disconnect', () => {
      console.log('User disconnected :', socketRef.current.id);
    });

    // Nettoyer les événements lorsque le composant est démonté
    return () => {
      socketRef.current.off('connect');
      socketRef.current.off('chat message');
      socketRef.current.off('disconnect');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socketRef.current.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Chat Application</h1>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
