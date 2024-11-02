import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const Popup = ({ message, onClose }) => {
  const [showQRCode, setShowQRCode] = useState(false);

  // Payload completo do PIX
  const pixPayload = "00020126440014BR.GOV.BCB.PIX0122heric.moura@unifesp.br5204000053039865802BR5921Heric Moura Rodrigues6009SAO PAULO62140510gOdDMBLKbG6304C082";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto transform transition-transform duration-300 popup-enter">
        <h2 className="text-lg font-bold mb-2 text-center">Apoie o site!</h2>
        
        <p className="text-center">{message}</p>

        <div 
          className="w-30 h-30 object-cover rounded-full transition-transform transform hover:scale-110 duration-300 flex justify-center mt-4"
          onMouseEnter={() => setShowQRCode(true)}
          onMouseLeave={() => setShowQRCode(false)}
        >
          {showQRCode ? (
            <QRCodeCanvas value={pixPayload} size={128} />
          ) : (
            <img 
              src={`${process.env.PUBLIC_URL}/1730559014437.png`}
              alt="Imagem pedindo apoio"
              className="w-30 h-30 object-cover rounded-full"
            />
          )}
        </div>

        <p className="text-center mt-2 text-sm">Faça um PIX para: heric.moura@unifesp.br</p>

        <button 
          onClick={onClose} 
          className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Popup;
