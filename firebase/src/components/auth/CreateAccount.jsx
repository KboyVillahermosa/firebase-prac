import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';
import { app, db } from '../../firebaseConfig'; 
import './CreateAccounts.css';

const auth = getAuth(app);

const CreateAccount = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // If an image is uploaded, update profile with photoURL
      if (image) {
        const reader = new FileReader();
        reader.onload = async () => {
          await updateProfile(user, {
            displayName: name,
            photoURL: reader.result,
          });

          // Add user info to Firestore
          await setDoc(doc(db, "users", user.uid), {
            displayName: name,
            email: user.email,
            photoURL: reader.result,
            loginType: "Email",
          });

          onRegister(user);
        };
        reader.readAsDataURL(image);
      } else {
        await updateProfile(user, { displayName: name });

        // Add user info to Firestore (without image)
        await setDoc(doc(db, "users", user.uid), {
          displayName: name,
          email: user.email,
          loginType: "Email",
        });

        onRegister(user);
      }

      navigate('/home');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account">
      <div className="create-content">
      <h1 className="mb-5 text-4xl text-pink-500 font-bold justify-center flex">Create an Account</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <div className="file-input-wrapper">
            <input
              type="file"
              id="file-upload"
              onChange={(e) => setImage(e.target.files[0])}
              className="file-input-hidden"
            />
            <label htmlFor="file-upload" className="file-input-label">
              Choose File
            </label>
            {image && <span className="file-name">{image.name}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'}`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <div className="already justify-center flex">
           <a href="/google-login" className='text-pink-500'> Already Have an Account? <span className='text-pink-500'>Login</span></a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
