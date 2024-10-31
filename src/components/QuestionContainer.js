import React from 'react';

const QuestionContainer = ({ questions }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Questões do Simulado</h2>
    {questions.length === 0 ? (
      <p>Nenhuma questão selecionada. Gere um simulado para começar.</p>
    ) : (
      <ul className="space-y-4">
        {questions.map((question, index) => (
          <li key={index} className="p-4 bg-white rounded shadow">
            <p className="font-semibold">Pergunta {index + 1}</p>
            <p>{question.texto}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default QuestionContainer;
