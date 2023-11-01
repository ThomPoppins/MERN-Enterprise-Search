// Navbar.tsx

import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Vind Expert</div>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-white">
              Home
            </a>
            <a href="#" className="text-white">
              About
            </a>
            <a href="#" className="text-white">
              Services
            </a>
            <a href="#" className="text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
