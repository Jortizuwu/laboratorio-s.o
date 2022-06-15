import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Index = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <header className="bg-white shadow flex justify-between p-10">
        <h1 className="text-3xl font-bold text-gray-900">Simulator</h1>
      </header>
      <main className="p-10 flex items-center w-full justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Index;
