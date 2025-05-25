import React from "react";
import { useState, useEffect } from "react";
import { CheckSquare2, Menu, X, User, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";
import LoginPopup from "./ui/LoginPopup";
import Button from "./ui/Button";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/todos" },
    { name: "Notes", path: "/notes" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <CheckSquare2 className="h-8 w-8 text-blue-600 transition-transform duration-300 hover:scale-110" />
              <span
                className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-gray-800" : "text-gray-800"
                }`}
              >
                Noted
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className={`font-medium text-sm hover:text-blue-600 transition-colors duration-200 ${
                    isScrolled ? "text-gray-700" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isUserMenuOpen ? "bg-gray-100" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name || "User"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isScrolled ? "text-gray-800" : "text-gray-800"
                      }`}
                    >
                      {user.name || "User"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5 animate-fadeIn">
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </a>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsLoginOpen(true)}
                  className="shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  Log in
                </Button>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded-md focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X
                  className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-gray-800"}`}
                />
              ) : (
                <Menu
                  className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-gray-800"}`}
                />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <CheckSquare2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-extrabold tracking-tight text-gray-800">
                Noted
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gray-800" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 mb-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-gray-800 font-medium text-lg hover:text-blue-600 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-auto">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {user.name || "User"}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <a
                  href="/profile"
                  className="block w-full p-3 text-center bg-gray-50 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block w-full p-3 text-center bg-gray-50 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </a>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full p-3 text-center bg-red-50 rounded-lg text-red-600 hover:bg-red-100 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full shadow-sm"
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </div>

      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Header;
