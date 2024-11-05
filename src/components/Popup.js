import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const Popup = ({ message, onClose }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isImageVisible, setImageVisible] = useState(false);

  const pixPayload = "00020126440014BR.GOV.BCB.PIX0122heric.moura@unifesp.br5204000053039865802BR5921Heric Moura Rodrigues6009SAO PAULO62140510gOdDMBLKbG6304C082";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixPayload);
    alert("Código PIX copiado para a área de transferência!");
  };

  useEffect(() => {
    setPopupVisible(true);
    setTimeout(() => {
      setImageVisible(true);
    }, 300); // Atraso para a imagem aparecer depois do popup
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Balão de diálogo com animação de baixo para cima */}
      <div
        className={`bg-yellow-100 rounded-lg shadow-lg p-6 max-w-sm w-full text-center transform transition-transform duration-500 ${
          isPopupVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-black">Apoie o Projeto</h2>
        <p className="mb-4 text-orange-600">{message}</p>

        <QRCodeCanvas value={pixPayload} size={128} className="mx-auto mb-4" />

        <button 
          onClick={copyToClipboard} 
          className="mt-2 bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 w-full"
        >
          Copiar Código PIX
        </button>

        <button 
          onClick={onClose} 
          className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 w-full"
        >
          Fechar
        </button>
      </div>

      {/* Imagem com animação da direita para a esquerda */}
      <a
        href="https://hericmr.github.io/me/portuguese"
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute bottom-5 right-5 transition-transform duration-500 ${
          isImageVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <img src="https://hericmr.github.io/me/imagens/heric.png" alt="Heric" className="max-20" />
      </a>
    </div>
  );
};

export default Popup;
