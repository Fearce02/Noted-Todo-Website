import React from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import Landingpage from "./components/Landingpage";
import { Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, setUser } from "./store/userSlice";
import { Navigate } from "react-router-dom";
import CompleteProfile from "./components/ui/CompleteProfile";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // const profileIncomplete =
  //   user &&
  //   (!user.firstName.trim() || !user.lastName.trim() || !user.username.trim());
  // if (loading) {
  //   return <p className="text-center mt-20">Loading user data...</p>;
  // }
  const profileIncomplete =
    user &&
    (typeof user.username !== "string" ||
      user.username.trim() === "" ||
      typeof user.firstName !== "string" ||
      user.firstName.trim() === "" ||
      typeof user.lastName !== "string" ||
      user.lastName.trim() === "");

  const handleProfileCompletion = (updatedUser) => {
    dispatch(setUser(updatedUser));
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landingpage />} />

        <Route
          path="/complete-profile"
          element={
            user && !profileIncomplete ? (
              <Navigate to="/todos" replace />
            ) : (
              <CompleteProfile onProfileCompletion={handleProfileCompletion} />
            )
          }
        />

        <Route
          path="/todos"
          element={
            user && profileIncomplete ? (
              <Navigate to="/complete-profile" replace />
            ) : (
              <TodoList />
            )
          }
        />

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
        {/* <Route path="/" element={<Landingpage />} />
        {console.log("App.jsx - user state:", user)};
        {user && profileIncomplete && (
          <Route
            path="/complete-profile"
            element={
              <CompleteProfile onProfileCompletion={handleProfileCompletion} />
            }
          />
        )}
        {user && !profileIncomplete && (
          <Route path="/todos" element={<TodoList />} />
        )}
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
        /> */}
      </Routes>
    </>
  );
}

export default App;
