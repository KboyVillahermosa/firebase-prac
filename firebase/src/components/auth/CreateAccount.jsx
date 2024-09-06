import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebaseConfig';
import './CreateAccount.css';

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
      if (image) {
        const reader = new FileReader();
        reader.onload = async () => {
          await updateProfile(result.user, {
            displayName: name,
            photoURL: reader.result
          });
          onRegister(result.user);
        };
        reader.readAsDataURL(image);
      } else {
        await updateProfile(result.user, { displayName: name });
        onRegister(result.user);
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <p className="text-center">
            <span className="text-gray-500">Already have an account?</span>
            <a href="/home" className="text-pink-500 ml-1">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
