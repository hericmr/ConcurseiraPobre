import React from 'react';
import QuestionCard from './QuestionCard'; // Certifique-se de que está importando o QuestionCard

const QuestionContainer = ({ questions }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Questões do Simulado</h2>
    {questions.length === 0 ? (
      <p>Nenhuma questão selecionada. Gere um simulado para começar.</p>
    ) : (
      <ul className="space-y-4">
        {questions.map((question, index) => (
          <li key={index} className="p-4 bg-white rounded shadow">
            <QuestionCard question={question} index={index} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default QuestionContainer;
