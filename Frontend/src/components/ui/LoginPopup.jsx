import React, { useState } from "react";
import { X, Mail, Lock } from "lucide-react";
import Button from "./Button";

function LoginPopup({ isOpen, onClose }) {
  const [login, setIslogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handlesubmission = (e) => {
    e.preventDefault();
    console.log("Form Submitted", { email, password });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-6">
            {login ? "Welcome!" : "Create an account"}
          </h2>

          <form onSubmit={handlesubmission} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {" "}
                Email{" "}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Please enter your email or username"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {" "}
                Password{" "}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Please enter your password"
                  required
                />
              </div>
            </div>
            <Button type="submit" variant="primary" fullWidth>
              {login ? "Sign In" : "Create Account"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  {" "}
                  Or Continue with
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              className="flex items-center justify-center space-x-2"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </Button>
            <p className="text-center text-sm text-slate-600 mt-6">
              {login ? "Dont have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIslogin(!login)}
                className="text-indigo-600 font-medium hover:text-indigo-500"
              >
                {login ? "Create an account" : "Sign In"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPopup;
