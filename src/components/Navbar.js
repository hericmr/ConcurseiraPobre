import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-black to-gray-900 p-2 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-lg font-bold text-white hover:text-yellow-300 transition duration-300">
          Concurseira Pobre
        </p>
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
