import React from "react";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "./ui/Button";
import LoginPopup from "./ui/LoginPopup";

function Landingpage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <>
      <section className="pt-32 pb-20 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                Track your Tasks daily with Noted!
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                With Noted, you can easily stay organized, focused, and
                productive throughout your day.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Simple and intuitive interface",
                  "Organize with tags and priorities",
                  "Set reminders and due dates",
                  "Track your productivity",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/6408282/pexels-photo-6408282.jpeg"
                  alt="noted-app-interface"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-indigo-100 h-24 w-24 rounded-full z-0"></div>
              <div className="absolute -top-8 -right-8 bg-purple-100 h-32 w-32 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Landingpage;
