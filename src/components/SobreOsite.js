import React from "react";

const SobreOsite = () => (
  <section id="SobreOsite" className="bg-gradient-to-b from-orange-100 to-[#ffafbd] py-16">
    <div className="container mx-auto flex flex-col items-center px-4">
      
      {/* Título */}
      <div className="text-center mb-8">
        <h2 className="text-primary-10 text-3xl font-semibold md:text-4xl text-black">
          Sobre o site
        </h2>
      </div>

      {/* Descrição do site */}
      <div className="max-w-[800px] text-center mb-8">
        <p className="text-primary-50 text-sm font-normal md:text-lg text-black">
          Bem-vindo ao Concurseira Pobre! Nosso objetivo é oferecer um portal gratuito com questões de provas reais da banca Avança-SP, ajudando você a se preparar para concursos de maneira prática e eficiente.
        </p>
      </div>

      {/* Benefícios */}
      <div className="flex flex-wrap justify-center gap-6">
        <div className="max-w-[300px] text-center bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-black mb-4">Acesso 100% Gratuito</h3>
          <p className="text-gray-700 text-sm md:text-base">
            Todas as questões e materiais estão disponíveis sem custo. Nosso site é feito por concurseiros, para concurseiros.
          </p>
        </div>

        <div className="max-w-[300px] text-center bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-black mb-4">Provas Reais</h3>
          <p className="text-gray-700 text-sm md:text-base">
            Estude com questões de concursos anteriores da Avança-SP, uma das bancas mais conhecidas e desafiadoras.
          </p>
        </div>

        <div className="max-w-[300px] text-center bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-black mb-4">Plataforma Simples e Eficiente</h3>
          <p className="text-gray-700 text-sm md:text-base">
            Nosso design é intuitivo, permitindo que você encontre rapidamente as questões e inicie seus estudos sem complicações.
          </p>
        </div>
      </div>

      {/* Chamada à ação */}
      <div className="mt-12">
        <p className="text-lg font-semibold text-black mb-4">
          Estamos aqui para ajudar você a conquistar sua aprovação. Se esse conteúdo foi útil, considere fazer um PIX de qualquer valor para apoiar nosso trabalho!
        </p>
      </div>

    </div>
  </section>
);

export default SobreOsite;
