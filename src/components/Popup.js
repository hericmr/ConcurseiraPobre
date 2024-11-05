import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const Popup = ({ message, onClose }) => {
  // Payload completo do PIX
  const pixPayload = "00020126440014BR.GOV.BCB.PIX0122heric.moura@unifesp.br5204000053039865802BR5921Heric Moura Rodrigues6009SAO PAULO62140510gOdDMBLKbG6304C082";

  // Função para copiar o código PIX
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixPayload);
    alert("Código PIX copiado para a área de transferência!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-200 bg-opacity-70 z-50">
      <div className="bg-yellow-100 rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center">
        {/* Mensagem informativa */}
        <h2 className="text-xl font-bold mb-4 text-orange-700">Apoie o Projeto</h2>
        <p className="mb-4 text-orange-600">{message}</p>

        {/* Exibe o QR Code */}
        <QRCodeCanvas value={pixPayload} size={128} className="mx-auto mb-4" />

        {/* Botão para copiar o código PIX */}
        <button 
          onClick={copyToClipboard} 
          className="mt-2 bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 w-full"
        >
          Copiar Código PIX
        </button>

        {/* Botão para fechar o popup */}
        <button 
          onClick={onClose} 
          className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 w-full"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Popup;
