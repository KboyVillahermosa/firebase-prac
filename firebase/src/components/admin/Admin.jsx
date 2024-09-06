import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import './Admin.css'; 

const auth = getAuth();
const db = getFirestore();

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [adminView, setAdminView] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUsers = async () => {
        try {
          const usersCollection = collection(db, 'users'); // Replace with your users collection name
          const userSnapshot = await getDocs(usersCollection);
          const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUsers(userList);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.email === 'admin@example.com') { // Replace with your admin email
        setIsLoggedIn(true);
        setAdminView(true);
      } else {
        alert('Not authorized');
      }
    } catch (error) {
      console.log(error);
      alert('Error logging in');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      setAdminView(false);
    });
  };

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId)); // Replace with your users collection name
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin">
      {!isLoggedIn ? (
        <div className="admin-login">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>Login</button>
          </form>
        </div>
      ) : (
        <div className="admin-page">
          <button onClick={handleLogout}>Logout</button>
          <h1>User Management</h1>
          {loading ? <p>Loading...</p> : (
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  <p>{user.email}</p>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
