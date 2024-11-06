// Header.js
import React from "react";

const Header = () => (
  <header className="bg-gradient-to-b from-[#ffafbd] to-[#ffc3a0] py-30">
    <div className="container mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-center px-4">
      
      {/* Texto com destaque */}
      <div className="flex flex-col items-center md:min-h-[150px] lg:flex-1 text-center">
        <div className="max-w-[630px] flex flex-col gap-3 pt-6 md:py-8">
          <h1 className="text-primary-10 text-3xl font-semibold italic md:text-4xl text-black">

            Questões da banca AVANÇA SP - ACESSE GRÁTIS!
          </h1>
          <p className="text-primary-50 text-sm font-normal md:text-lg text-black">
            A melhor maneira de se preparar para concursos é praticando com provas reais da banca! Conheça a abordagem da Avança SP e domine os conteúdos exigidos. Esse site é 100% gratuito e oferece uma vasta coleção de questões para turbinar seus estudos em São Paulo.
          </p>
        </div>
      </div>


    </div>
  </header>
);

export default Header;
