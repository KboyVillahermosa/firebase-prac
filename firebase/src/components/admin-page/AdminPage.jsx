import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const AdminPage = ({ onLogout }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userDocs = await getDocs(usersCollection);
        const usersList = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?");
    if (!confirmation) return;

    try {
      // Delete user from Firestore
      await deleteDoc(doc(db, 'users', userId));

      // Make API call to delete user from Firebase Authentication (backend API)
      const response = await fetch('/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: userId }), // Send UID to the backend
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setUsers(users.filter(user => user.id !== userId));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <button onClick={onLogout}>Logout</button>
      <h2>Registered Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center space-x-2">
            <img src={user.photoURL || '/path/to/default/profile/pic.png'} alt="Profile" className="h-8 w-8 rounded-full"/>
            <div>
              <p>{user.displayName}</p>
              <p>{user.email}</p>
              <p>Login Type: {user.loginType}</p>
            </div>
            <button 
              onClick={() => handleDeleteUser(user.id)} 
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <a href="/">logout</a>
    </div>
  );
};

export default AdminPage;
