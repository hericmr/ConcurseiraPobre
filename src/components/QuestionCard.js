// QuestionCard.js
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
    <div className="bg-white p-6 rounded-lg shadow-lg mt-4 border border-gray-200">
      <div className="flex flex-wrap gap-x-6 text-gray-700 font-medium mb-4">
        <h5 className="text-lg font-semibold">Cargo: {question.cargo}</h5>
        <p><strong>Disciplina:</strong> {question.disciplina}</p>
        <p><strong>Edital:</strong> {question.id_concurso}</p>
        <p><strong>Ano:</strong> {extractAno(question.id_concurso)}</p>
        <p><strong>Banca:</strong> Avança-SP</p>
      </div>

      
      <p className="text-gray-600 font-medium mb-4">{index + 1}. {question.questão}</p>

      <div className="space-y-2">
        {Object.entries(question.alternativas).map(([letter, text]) => (
          <div
            key={letter}
            className={`flex items-center p-2 rounded-md ${
              isAnswered && letter === question.resposta_correta
                ? "bg-green-100 border border-green-500"
                : ""
            }`}
          >
            <input
              type="radio"
              name={`question-${index}`}
              value={letter}
              checked={selectedAnswer === letter}
              onChange={() => setSelectedAnswer(letter)}
              disabled={isAnswered}
              className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label className="text-gray-700">{letter}: {text}</label>
          </div>
        ))}
      </div>

      <button
        onClick={checkAnswer}
        className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
        disabled={isAnswered}
      >
        Verificar Resposta
      </button>

      {feedback && (
        <p className={`mt-3 text-center font-semibold ${feedback === "Correto!" ? "text-green-500" : "text-red-500"}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default QuestionCard;
