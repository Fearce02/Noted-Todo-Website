import { useState } from "react";
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

const baseAPI = "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // For testing, you might hardcode or fetch the user info here
  //   // For now, assume user just logged in and profile is incomplete
  //   // You will replace this logic with real login flow
  //   const loggedInUser = {
  //     id: "123",
  //     email: "test@example.com",
  //     firstName: "",
  //     lastName: "",
  //     profileComplete: false,
  //   };
  //   setUser(loggedInUser);
  // }, []);
  const profileIncomplete = user && (!user.firstName || !user.lastName);

  // Callback after profile is updated
  const handleProfileCompletion = (updatedUser) => {
    setUser(updatedUser);
  };

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
