// src/components/header/Header.jsx

import { useState, useEffect } from "react";
import GoogleLogin from "../auth/GoogleLogin";
import Home from "../home/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebaseConfig";
import "./Header.css";

const auth = getAuth(app);

const Header = () => {
    const [user, setUser] = useState(null);

    // Check authentication state on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = (user) => {
        setUser(user);
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            setUser(null);
        }).catch((error) => console.log(error));
    };

    return (
        <div className="container">
            {!user ? (
                <GoogleLogin onLogin={handleLogin} />
            ) : (
                <Home user={user} onLogout={handleLogout} />
            )}
        </div>
    );
};

export default Header;
