import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-900 p-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <button className="text-xl font-bold text-white hover:text-yellow-300 transition duration-300">
          Concurseira Pobre
        </button>
        <ul className="flex space-x-4">
          <li>
            <a
              href="#download"
              className="text-white hover:text-yellow-300 transition duration-300 text-sm"
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
