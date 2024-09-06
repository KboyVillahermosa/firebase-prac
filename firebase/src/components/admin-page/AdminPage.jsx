import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './AdminPage.css';

const auth = getAuth();
const db = getFirestore();

const AdminPage = ({ user, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Example admin check
    if (!user || !user.email.endsWith('@admin.com')) {
      // Redirect or handle unauthorized access
      return <Navigate to="/home" />;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError('Failed to delete user.');
    }
  };

  const handleLogout = () => {
    signOut(auth).catch(error => {
      console.error("Error signing out:", error);
    });
  };

  return (
    <div className="admin-page">
      <button onClick={handleLogout}>Logout</button>
      <h1>User Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>{user.email}</p>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
