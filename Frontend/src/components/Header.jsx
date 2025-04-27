import React, { use } from "react";
import { Menu, X, CheckSquare2 } from "lucide-react";
import { useState, useEffect } from "react";
import LoginPopup from "./ui/LoginPopup";
import Button from "./ui/Button";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white py-3" : "bg-transparent py-5 "
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckSquare2 className=" h-8 w-8 text-blue-600" />
              <span className="text-xl font-extrabold tracking-tight ">
                Noted
              </span>
            </div>
            <nav className="hidden md:flex items-center spacce-x-8">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsLoginOpen(true)}
              >
                Log in
              </Button>
            </nav>
          </div>
        </div>
      </div>
      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Header;
