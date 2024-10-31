// Navbar.js
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white hover:text-yellow-300 transition duration-300">
          Concurseira Pobre
        </a>
        <ul className="flex space-x-6">
        
          <li>
            <a
              href="#download"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              Sobre o site
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
