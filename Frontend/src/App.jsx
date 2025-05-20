import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Landingpage from "./components/Landingpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import { useSelector, useDispatch, Provider } from "react-redux";
import { fetchUser, setUser } from "./store/userSlice";
import { store } from "./store";
import { Navigate } from "react-router-dom";
import CompleteProfile from "./components/ui/CompleteProfile";

const baseAPI = "http://localhost:3000";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const profileIncomplete =
    user && (!user.info?.firstname || !user.info?.lastname);
  if (loading) {
    return <p className="text-center mt-20">Loading user data...</p>;
  }

  const handleProfileCompletion = (updatedUser) => {
    dispatch(setUser(updatedUser));
  };

  if (loading) {
    return <p className="text-center mt-20">Loading user data...</p>;
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landingpage />} />

        {user && profileIncomplete && (
          <Route
            path="/complete-profile"
            element={
              <CompleteProfile
                onProfileCompletion={(updatedUser) =>
                  dispatch(setUser(updatedUser))
                }
              />
            }
          />
        )}

        {user && !profileIncomplete && (
          <Route path="/todos" element={<TodoList />} />
        )}

        {/* Redirect logic */}
        <Route
          path="*"
          element={
            !user ? (
              <Navigate to="/" />
            ) : profileIncomplete ? (
              <Navigate to="/complete-profile" />
            ) : (
              <Navigate to="/todos" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
