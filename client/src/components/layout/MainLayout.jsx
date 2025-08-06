// src/components/layouts/MainLayout.jsx
import React from "react";
import  Navbar  from "../Navbar";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {/* Optional: Add a footer here */}
    </div>
  );
};