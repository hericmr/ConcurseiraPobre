// Footer.js
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Mostrar o footer se a página for rolada
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 text-center p-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <p className="text-sm">
        &copy; 2024 Concurseira Pobre |{" "}
        <a
          href="https://hericmr.github.io/me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-200 hover:underline"
        >
          Héric Moura
        </a>
      </p>
    </footer>
  );
};

export default Footer;


