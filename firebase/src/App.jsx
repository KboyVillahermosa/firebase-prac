// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebaseConfig';
import  Navbar from './components/navbar/Navbar';
import GoogleLogin from './components/auth/GoogleLogin';
import Home from './components/home/Home';
import About from './components/about/About'; 
import Contact from './components/contact/Contact'; 
import Content from './components/content/Content'; 
import './App.css'; 

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => console.log(error));
  };

  return (
    <Router>
      {user ? (
        <>
            <Navbar user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/home" element={<>
              <Home user={user} onLogout={handleLogout} />
              <Content />
            </>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Navigate to="/home" />} />
            {/* Redirect to /home if the path is not found */}
          </Routes>
        </>
      ) : (
        <GoogleLogin onLogin={setUser} />
      )}
    </Router>
  );
};

export default App;
