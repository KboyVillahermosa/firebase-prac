// src/components/auth/GoogleLogin.jsx
import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebaseConfig';
import { FaGoogle } from "react-icons/fa";
import './GoogleLogin.css';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const GoogleLogin = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        onLogin(result.user); // Pass the user data to the parent component
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="google-login">
      <div className="google-image">
        <img src="/web.jpg" alt="" />
      </div>
      <div className="google-content">
        <div className="google-btn">
        <h1 className='flex uppercase items-center' onClick={handleLogin}> <img src="/google.png" alt="" />Continue with Google  </h1>
        </div>
    </div>
    </div>
  );
};

export default GoogleLogin;
