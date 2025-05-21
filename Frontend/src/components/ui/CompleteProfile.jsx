import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { User, AtSign, UserCircle, Loader, AlertCircle } from "lucide-react";
import Button from "./Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const baseAPI = "http://localhost:3000";

function CompleteProfile({ onProfileCompletion }) {
  const user = useSelector((state) => state.user.user);
  console.log("CompleteProfile mounted with user:", user);
  console.log("Redux user state:", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user.info?.username || "",
    firstName: user.info?.firstName || "",
    lastName: user.info?.lastName || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const validateForm = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // letters, numbers, underscore, 3-20 chars
    if (
      !validateNonEmpty(formData.username) ||
      !usernameRegex.test(formData.username.trim())
    ) {
      setError(
        "Username must be 3-20 characters and can contain letters, numbers, and underscores only."
      );
      return false;
    }
    if (!validateNonEmpty(formData.firstName)) {
      setError("First name is required.");
      return false;
    }
    if (!validateNonEmpty(formData.lastName)) {
      setError("Last name is required.");
      return false;
    }
    setError(null);
    return true;
  };

  const validateNonEmpty = (str) => str && str.trim().length > 0;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError(null);

    try {
      const jwttoken = localStorage.getItem("token");
      if (!jwttoken) {
        throw new Error("User not signed in please sign in to Continue");
      }

      const response = await axios.put(
        `${baseAPI}/auth/updateUser`,
        {
          username: username.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        }
      );
      dispatch(setUser(response.data.user));
      if (onProfileCompletion) {
        onProfileCompletion(response.data.user);
      }
      navigate("/todos");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data.message || "Failed to Update Profile details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
          <div className="p-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100 mx-auto mb-6">
              <User className="h-6 w-6 text-indigo-600" />
            </div>

            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
              Complete Your Profile
            </h2>
            <p className="text-slate-600 text-center mb-8">
              Tell us a bit more about yourself to get started
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-3 text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmission} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    ref={usernameRef}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
                      placeholder="First name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                fullWidth
                className="flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Saving Changes...
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;
