// App.js
import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SimuladoForm from "./components/SimuladoForm";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <Header />
      <SimuladoForm />
      <Footer />
    </div>
  );
}

export default App;
