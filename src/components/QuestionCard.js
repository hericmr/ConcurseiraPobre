import React, { useState } from "react";

const QuestionCard = ({ question }) => {
  const [feedback, setFeedback] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [discardedAnswers, setDiscardedAnswers] = useState([]);

  const checkAnswer = () => {
    setIsAnswered(true);
    const isCorrect = selectedAnswer === question.resposta_correta;
    setFeedback(isCorrect ? "Correto!" : `Incorreto! A resposta correta é: ${question.resposta_correta}`);
  };

  const discardAnswer = (letter) => {
    setDiscardedAnswers((prev) => [...prev, letter]);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-6 border border-gray-200 relative max-w-5xl mx-auto">
      {/* Novo container para informações do cargo, edital, ano e banca */}
      <div className="absolute top-0 left-0 w-full bg-gray-800 p-4 rounded-t-lg text-white text-sm">
        <div className="flex flex-wrap gap-x-6 font-semibold justify-between">
          <h5 className="font-semibold">Cargo: {question.cargo}</h5>
          <h5 className="font-semibold">Edital: {question.id_concurso}</h5>
          <h5 className="font-semibold">Ano: {question.id_concurso.slice(-4)}</h5>
          <h5 className="font-semibold">Banca: Avança-SP</h5>
        </div>
      </div>

      {/* Espaço para compensar o elemento fixo no topo */}
      <div className="mt-10"></div>

      {/* Texto relevante */}
      {question.texto_relevante && (
        <div className="bg-gray-50 p-1 mb-6 rounded-lg border border-gray-100 text-sm">
          <p className="text-gray-600 leading-relaxed">{question.texto_relevante}</p>
        </div>
      )}

      {/* Enunciado */}
      <p className="text-sm font-semibold mb-4 leading-relaxed">
        {question.enunciado}
      </p>

      {/* Alternativas */}
      <div className="space-y-4 text-sm">
        {Object.entries(question.alternativas).map(([letter, text]) => {
          const isCorrectAnswer = isAnswered && letter === question.resposta_correta;
          const isSelectedAnswer = selectedAnswer === letter;
          const isDiscarded = discardedAnswers.includes(letter);

          return (
            <div
              key={letter}
              className={`flex items-center cursor-pointer p-2 rounded-lg transition-all duration-200 
                ${isCorrectAnswer ? "bg-green-100 border border-green-500" : ""}
                ${isSelectedAnswer && !isAnswered ? "bg-gray-100" : ""}
                ${isDiscarded ? "bg-gray-300 opacity-50" : ""}`}
              onClick={(e) => {
                if (!isAnswered) {
                  e.stopPropagation();
                  setSelectedAnswer(letter);
                }
              }}
            >
              <label
                className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-200 
                  ${isSelectedAnswer ? "bg-black text-white" : "border-black text-black"}`}
              >
                {letter}
              </label>

              <span className={`ml-3 ${isSelectedAnswer ? "text-black" : "text-gray-700"}`}>
                {text}
              </span>

              {!isAnswered && !isDiscarded && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    discardAnswer(letter);
                  }}
                  className="ml-auto mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botão para verificar resposta */}
      <button
        onClick={checkAnswer}
        className="mt-6 w-full bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors text-sm"
        disabled={isAnswered}
      >
        Verificar Resposta
      </button>

      {/* Feedback */}
      {feedback && (
        <p className={`mt-4 text-center font-semibold ${feedback === "Correto!" ? "text-green-500" : "text-red-500"} text-sm`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default QuestionCard;
