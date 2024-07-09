import { useEffect, useRef } from 'react';
import './App.css';
import socketEnv from "./connection";

function App() {
  const socketRef = useRef(socketEnv);

  useEffect(() => {
    // Gérer la connexion
    socketRef.current.on('connect', () => {
      console.log('User connected :', socketRef.current.id);
    });

    // Gérer la déconnexion
    socketRef.current.on('disconnect', () => {
      console.log('User disconnected :', socketRef.current.id);
    });

    // Nettoyer les événements lorsque le composant est démonté
    return () => {
      socketRef.current.off('connect');
      socketRef.current.off('disconnect');
      // socketRef.current.disconnect();
    };
  }, []);

  return (
    <>
      <p>salut</p>
    </>
  );
}

export default App;
