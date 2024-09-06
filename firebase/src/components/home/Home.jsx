import React from "react";
import "./Home.css"; // Make sure the CSS file is in the correct path

const Home = ({ user, onLogout }) => {
    return (
        <div className="home">
            <h1>Welcome to the Home Page!</h1>
            <h2>User Info:</h2>
            <h3>Name: {user.displayName}</h3>
            <h3>Email: {user.email}</h3>
            <img src={user.photoURL} alt="User" />
            <button onClick={onLogout} className="logout">
                Log Out
            </button>
        </div>
    );
};

export default Home;
