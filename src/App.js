// App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SimuladoForm from "./components/SimuladoForm";
import Footer from "./components/Footer";
import Popup from "./components/Popup"; 

function App() {
  const [showPopup, setShowPopup] = useState(false);


  const closePopup = () => {
    setShowPopup(false);
  };
  


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 180000); // Exibe o popup após 3 minutos

    return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-orange-100">
      <Navbar />
      <Header />
      <SimuladoForm />
      <Footer />

      {showPopup && (
        <Popup 
          message="Concurseira Pobre é e sempre será gratuito! Ao contrário de muitos sites por aí que cobram para acesso a questões. Fique à vontade para usar tudo de graça e, se esse conteúdo te ajudou, considere fazer um PIX de qualquer valor para o programador do site, que também é um concurseiro pobre!"
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default App;
