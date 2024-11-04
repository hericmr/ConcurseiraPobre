import React, { useState } from "react";

const QuestionCard = ({ question, index }) => {
  const [feedback, setFeedback] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  const checkAnswer = () => {
    setIsAnswered(true);
    const isCorrect = selectedAnswer === question.resposta_correta;
    setFeedback(isCorrect ? "Correto!" : `Incorreto! A resposta correta é: ${question.resposta_correta}`);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-6 border border-gray-200">
      {/* Novo container para informações do cargo, edital, ano e banca */}
      <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-300">
        <div className="flex flex-wrap gap-x-6 text-gray-700 font-medium">
          <h5 className="text-lg font-semibold">Cargo: {question.cargo}</h5>
          <p><strong>Edital:</strong> {question.id_concurso}</p>
          <p><strong>Ano:</strong> {question.id_concurso.slice(-4)}</p>
          <p><strong>Banca:</strong> Avança-SP</p>
        </div>
      </div>

      {/* Enunciado */}
      <p className="text-gray-800 font-medium mb-4 text-lg leading-relaxed">
        {question.enunciado}
      </p>


      {/* Alternativas */}
      <div className="space-y-4">
        {Object.entries(question.alternativas).map(([letter, text]) => {
          const isCorrectAnswer = isAnswered && letter === question.resposta_correta;
          const isSelectedAnswer = selectedAnswer === letter;

          return (
            <div
              key={letter}
              className={`flex items-center cursor-pointer p-2 rounded-lg transition-all duration-200 
                ${isCorrectAnswer ? "bg-green-100 border border-green-500" : ""}
                ${isSelectedAnswer && !isAnswered ? "bg-gray-100" : ""}`}
              onClick={() => !isAnswered && setSelectedAnswer(letter)}
            >
              <label
                className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-200 
                  ${isSelectedAnswer ? "bg-black text-white" : "border-black text-black"}`}
              >
                {letter}
              </label>

              <span className={`ml-3 text-lg ${isSelectedAnswer ? "text-black" : "text-gray-700"}`}>
                {text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Botão para verificar resposta */}
      <button
        onClick={checkAnswer}
        className="mt-6 w-full bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors"
        disabled={isAnswered}
      >
        Verificar Resposta
      </button>

      {/* Feedback */}
      {feedback && (
        <p className={`mt-4 text-center font-semibold text-lg ${feedback === "Correto!" ? "text-green-500" : "text-red-500"}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default QuestionCard;
