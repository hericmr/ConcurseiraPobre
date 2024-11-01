import React, { useState } from "react";

const QuestionCard = ({ question, index }) => {
  const [feedback, setFeedback] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  const checkAnswer = () => {
    setIsAnswered(true);
    if (selectedAnswer === question.resposta_correta) {
      setFeedback("Correto!");
    } else {
      setFeedback(`Incorreto! A resposta correta é: ${question.resposta_correta}`);
    }
  };

  // Extrai as últimas 4 letras do id_concurso para exibir como ano
  const extractAno = (id) => id.slice(-4);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-6 border border-gray-200">
      <div className="flex flex-wrap gap-x-6 text-gray-700 font-medium mb-6">
        <h5 className="text-lg font-semibold">Cargo: {question.cargo}</h5>
        <p><strong>Edital:</strong> {question.id_concurso}</p>
        <p><strong>Ano:</strong> {extractAno(question.id_concurso)}</p>
        <p><strong>Banca:</strong> Avança-SP</p>
      </div>

      <div className="mb-4"></div>
      
      <p className="text-gray-800 font-medium mb-6 text-xl leading-relaxed">
        {index + 1}. {question.questão}
      </p>

      <div className="space-y-4">
        {Object.entries(question.alternativas).map(([letter, text]) => (
          <div
            key={letter}
            className={`flex items-center cursor-pointer transition-all duration-200 ${
              isAnswered && letter === question.resposta_correta
                ? "bg-green-100 border border-green-500"
                : ""
            }`}
            onClick={() => {
              if (!isAnswered) {
                setSelectedAnswer(letter);
              }
            }}
          >
              <label
                className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                  selectedAnswer === letter ? "border-black text-black" : "border-black text-black"
                }`}
                style={{
                  backgroundColor: selectedAnswer === letter ? "black" : "transparent",
                  color: selectedAnswer === letter ? "white" : "inherit",
                }}
              >
                {letter}
              </label>

            <span className={`ml-3 text-lg ${selectedAnswer === letter ? "text-black" : "text-gray-700"}`}>
              {text}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={checkAnswer}
        className="mt-6 w-full bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors"
        disabled={isAnswered}
      >
        Verificar Resposta
      </button>

      {feedback && (
        <p className={`mt-4 text-center font-semibold text-lg ${feedback === "Correto!" ? "text-green-500" : "text-red-500"}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default QuestionCard;
