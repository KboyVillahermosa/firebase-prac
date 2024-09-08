import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseConfig";
import Navbar from "./components/navbar/Navbar";
import GoogleLogin from "./components/auth/GoogleLogin";
import CreateAccount from "./components/auth/CreateAccount"; 
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Header from "./components/header/Header";
import MainPage from "./pages/MainPage";
import JobInfoPage from "./pages/JobInfoPage";
import AdminPage from "./components/admin/Admin";
import Content from "./components/content/Content"
import "./App.css";

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => setUser(null))
      .catch((error) => console.log(error));
  };

  if (loading) {
    return (
      <div className="loader-header">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {user ? (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/home" element={
              <>
                <Header user={user} onLogout={handleLogout} />
                <About />
                <Content />
              </>
            } />
            <Route path="/main" element={<>
              <MainPage />
            
            
            </>} />

            <Route path="/job-info" element={<JobInfoPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={
              <AdminPage user={user} onLogout={handleLogout} />
            } />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/home" element={<GoogleLogin onLogin={setUser} />} />
          <Route path="/register" element={<CreateAccount onRegister={setUser} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;