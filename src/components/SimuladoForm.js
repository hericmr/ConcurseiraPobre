// SimuladoForm.js
import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

const SimuladoForm = () => {
  const [data, setData] = useState({});
  const [cargoOptions, setCargoOptions] = useState([]);
  const [selectedCargo, setSelectedCargo] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/hericmr/ConcurseiraPobre/master/public/provas_com_respostas.json`)

        .then(response => response.json())
        .then(data => {
            setData(data);
            populateCargoOptions(data);
            countTotalQuestions(data);
        })
        .catch(error => console.error('Erro:', error));
}, []);

  const populateCargoOptions = (data) => {
    const uniqueCargos = new Set();
    Object.entries(data).forEach(([concursoId, categorias]) => {
      Object.values(categorias).forEach(categoria => {
        categoria.questoes.forEach(questao => {
          uniqueCargos.add(questao.cargo);
        });
      });
    });
    setCargoOptions([...uniqueCargos]);
  };

  const countTotalQuestions = (data) => {
    let count = 0;
    Object.entries(data).forEach(([concursoId, categorias]) => {
      Object.values(categorias).forEach(categoria => {
        count += categoria.questoes.length;
      });
    });
    setTotalQuestions(count);
  };

  const handleGenerateQuestions = (e) => {
    e.preventDefault();
    const filteredData = [];
    Object.entries(data).forEach(([concursoId, categorias]) => {
      Object.values(categorias).forEach(categoria => {
        categoria.questoes.forEach(questao => {
          if (questao.cargo === selectedCargo) {
            filteredData.push(questao);
          }
        });
      });
    });

    const selectedQuestions = [];
    for (let i = 0; i < Math.min(numQuestions, filteredData.length); i++) {
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      selectedQuestions.push(filteredData[randomIndex]);
      filteredData.splice(randomIndex, 1);
    }
    setQuestions(selectedQuestions);

    // Atualiza o total de questões após cada busca
    countTotalQuestions(data);
  };

  return (
    <section className="container mx-auto mt-8">
      <form onSubmit={handleGenerateQuestions} className="bg-white p-6 shadow rounded mx-auto max-w-lg">
        <div className="mb-4">
          <label htmlFor="cargo" className="block text-gray-700">Selecione o Cargo:</label>
          <select
            id="cargo"
            className="border border-gray-300 rounded p-2 w-full"
            value={selectedCargo}
            onChange={(e) => setSelectedCargo(e.target.value)}
          >
            <option value="">Selecione...</option>
            {cargoOptions.map((cargo) => (
              <option key={cargo} value={cargo}>{cargo}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="numero-questoes" className="block text-gray-700">Número de Questões:</label>
          <input
            type="number"
            id="numero-questoes"
            className="border border-gray-300 rounded p-2 w-full"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            min="1"
          />
        </div>
        <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded">Gerar Simulado</button>
      </form>
      <p className="text-center text-gray-700 mb-4">
        Foram encontradas {totalQuestions} questões em nosso banco de dados do site.
      </p>
      <div className="mt-6">
        {questions.length > 0 ? (
          questions.map((item, index) => (
            <QuestionCard key={index} question={item} index={index} />
          ))
        ) : (
          <p className="text-center">Nenhuma questão para exibir</p>
        )}
      </div>
    </section>
  );
};

export default SimuladoForm;
