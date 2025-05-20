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
import TodoList from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, setUser } from "./store/userSlice";

const baseAPI = "http://localhost:3000";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/todos" element={<TodoList />} />
    </Routes>
  );
};

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const profileIncomplete =
    user && (!user.info?.firstname || !user.info?.lastname);

  const handleProfileCompletion = (updatedUser) => {
    dispatch(setUser(updatedUser));
  };

  if (loading) {
    return <p className="text-center mt-20">Loading user data...</p>;
  }
  // const [user, setUser] = useState(null);
  // const [loadingUser, setLoadingUser] = useState(true);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setLoadingUser(false);
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(`${baseAPI}/auth/me`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setUser(response.data.user);
  //     } catch (err) {
  //       console.error("Failed to fetch user:", err);
  //       localStorage.removeItem("token"); // Invalid token cleanup
  //     } finally {
  //       setLoadingUser(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // const profileIncomplete =
  //   user && (!user.info?.firstname || !user.info?.lastname);

  // const handleProfileCompletion = (updatedUser) => {
  //   setUser(updatedUser);
  // };
  // if (loadingUser) {
  //   return <p className="text-center mt-20">Loading user data...</p>;
  // }

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
