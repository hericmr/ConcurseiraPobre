import React, { useState } from "react";

const QuestionCard = ({ question, index }) => {
  const [feedback, setFeedback] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [discardedAnswers, setDiscardedAnswers] = useState([]); // Novo estado para respostas descartadas

  const checkAnswer = () => {
    setIsAnswered(true);
    const isCorrect = selectedAnswer === question.resposta_correta;
    setFeedback(isCorrect ? "Correto!" : `Incorreto! A resposta correta é: ${question.resposta_correta}`);
  };

  // Função para descartar a alternativa
  const discardAnswer = (letter) => {
    setDiscardedAnswers((prev) => [...prev, letter]); // Adiciona a alternativa à lista de descartadas
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-6 border border-gray-200 relative">
      {/* Novo container para informações do cargo, edital, ano e banca */}/}
      <div className="absolute top-0 left-0 w-full bg-gray-800 p-4 rounded-t-lg text-white">
        <div className="flex flex-wrap gap-x-6 text-white font-semibold justify-between">
          <h5 className="text-lg font-semibold">Cargo: {question.cargo}</h5>
          <h5 className="text-lg font-semibold">Edital: {question.id_concurso}</h5>
          <h5 className="text-lg font-semibold">Ano: {question.id_concurso.slice(-4)}</h5>
          <h5 className="text-lg font-semibold">Banca: Avança-SP</h5>
        </div>
      </div>

      {/* Espaço para compensar o elemento fixo no topo */}}
      <div className="mt-20"></div>

      {/* Enunciado */}
      <p className="text- font-semibold mb-4 text-lg leading-relaxed">
        {question.enunciado}
      </p>

      {/* Alternativas */}
      <div className="space-y-4">
        {Object.entries(question.alternativas).map(([letter, text]) => {
          const isCorrectAnswer = isAnswered && letter === question.resposta_correta;
          const isSelectedAnswer = selectedAnswer === letter;
          const isDiscarded = discardedAnswers.includes(letter); // Verifica se a alternativa foi descartada

          return (
            <div
              key={letter}
              className={`flex items-center cursor-pointer p-2 rounded-lg transition-all duration-200 
                ${isCorrectAnswer ? "bg-green-100 border border-green-500" : ""}
                ${isSelectedAnswer && !isAnswered ? "bg-gray-100" : ""}
                ${isDiscarded ? "bg-gray-300 opacity-50" : ""}`} // Adiciona estilo quando a alternativa é descartada
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

              {/* Ícone de descarte */}
              {!isAnswered && !isDiscarded && (
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique no ícone ative a alternativa
                    discardAnswer(letter);
                  }}
                  className="ml-auto mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  {/* Ícone de descarte em SVG */}
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
