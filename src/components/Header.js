// Header.js
import React from "react";

const Header = () => (
  <header className="bg-gradient-to-b from-[#ffafbd] to-orange-100 py-30">
    <div className="container mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-center px-4">
      
      {/* Texto com destaque */}
      <div className="flex flex-col items-center md:min-h-[150px] lg:flex-1 text-center">
        <div className="max-w-[630px] flex flex-col gap-3 pt-6 md:py-8">
          <h1 className="text-primary-10 text-3xl font-semibold italic md:text-4xl text-black">

            Questões da banca AVANÇA SP - ACESSE GRÁTIS!
          </h1>
          <p className="text-primary-50 text-sm font-normal md:text-lg text-black">
          Pratique com provas reais da banca Avança-SP e melhore seu desempenho. Aqui você encontra, de forma gratuita, uma ampla coleção de questões dessa banca ajudar nos seus estudos!          </p>
        </div>
      </div>


    </div>
  </header>
);

export default Header;
