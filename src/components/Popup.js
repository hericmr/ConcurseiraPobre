import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const Popup = ({ onClose }) => {
  // Payload completo do PIX
  const pixPayload = "00020126440014BR.GOV.BCB.PIX0122heric.moura@unifesp.br5204000053039865802BR5921Heric Moura Rodrigues6009SAO PAULO62140510gOdDMBLKbG6304C082";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        {/* Exibe apenas o QR Code */}
        <QRCodeCanvas value={pixPayload} size={128} className="mx-auto" />

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
