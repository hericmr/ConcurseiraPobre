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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        {/* Mensagem informativa */}
        <h2 className="text-lg font-semibold mb-4">Apoie o Projeto</h2>
        <p className="mb-4">{message}</p>

        {/* Exibe o QR Code */}
        <QRCodeCanvas value={pixPayload} size={128} className="mx-auto mb-4" />

        {/* Botão para copiar o código PIX */}
        <button 
          onClick={copyToClipboard} 
          className="mt-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 w-full"
        >
          Copiar Código PIX
        </button>

        {/* Botão para fechar o popup */}
        <button 
          onClick={onClose} 
          className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Popup;
