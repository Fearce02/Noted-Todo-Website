import { useState } from "react";
import React from "react";
import Header from "./components/Header";
import Landingpage from "./components/Landingpage";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header></Header>
      <Landingpage />
    </div>
  );
}

export default App;
