import { useState, useEffect } from "react";
import React from "react";
import Header from "./components/Header";
import Landingpage from "./components/Landingpage";
import CompleteProfile from "./components/ui/CompleteProfile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

const baseAPI = "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoadingUser(false);
        return;
      }

      try {
        const response = await axios.get(`${baseAPI}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        localStorage.removeItem("token"); // Invalid token cleanup
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const profileIncomplete = user && (!user.firstName || !user.lastName);

  const handleProfileCompletion = (updatedUser) => {
    setUser(updatedUser);
  };
  if (loadingUser) {
    return <p className="text-center mt-20">Loading user data...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header></Header>
      {user ? (
        profileIncomplete ? (
          <CompleteProfile
            user={user}
            onProfileCompletion={handleProfileCompletion}
          />
        ) : (
          <Landingpage />
        )
      ) : (
        <Landingpage />
      )}
    </div>
  );
}

export default App;
