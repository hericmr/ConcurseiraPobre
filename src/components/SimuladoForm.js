import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

const SimuladoForm = () => {
  const [cargoOptions, setCargoOptions] = useState([]);
  const [selectedCargo, setSelectedCargo] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCargos = async () => {
      setIsLoading(true);
      try {
        // Lista dos cargos que existem na pasta cargos_json
        const response = await fetch(
          `https://raw.githubusercontent.com/hericmr/ConcurseiraPobre/master/public/cargos_list.json`
        );
        const cargoList = await response.json();

        setCargoOptions(cargoList);
      } catch (error) {
        console.error("Erro ao carregar a lista de cargos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCargos();
  }, []);

  const loadCargoData = async (cargo) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/hericmr/ConcurseiraPobre/master/public/cargos_json/${cargo}.json`
      );
      const cargoData = await response.json();

      setQuestions(cargoData[cargo] || []);
      setTotalQuestions(cargoData[cargo]?.length || 0);
    } catch (error) {
      console.error("Erro ao carregar os dados do cargo:", error);
      setQuestions([]);
      setTotalQuestions(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuestions = (e) => {
    e.preventDefault();
    if (!selectedCargo || questions.length === 0) return;

    const selectedQuestions = [];
    const filteredData = [...questions];

    for (let i = 0; i < Math.min(numQuestions, filteredData.length); i++) {
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      selectedQuestions.push(filteredData[randomIndex]);
      filteredData.splice(randomIndex, 1);
    }
    setQuestions(selectedQuestions);
  };

  return (
    <section className="container mx-auto mt-8">
      <form onSubmit={handleGenerateQuestions} className="bg-white p-6 shadow rounded mx-auto max-w-lg">
        <div className="mb-4">
          <label htmlFor="cargo" className="block text-gray-700">
            Selecione o Cargo:
          </label>
          <select
            id="cargo"
            className="border border-gray-300 rounded p-2 w-full"
            value={selectedCargo}
            onChange={(e) => {
              setSelectedCargo(e.target.value);
              loadCargoData(e.target.value); // Carrega o JSON do cargo selecionado
            }}
            disabled={isLoading}
          >
            <option value="">Selecione...</option>
            {cargoOptions.map((cargo) => (
              <option key={cargo} value={cargo}>
                {cargo}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="numero-questoes" className="block text-gray-700">
            Número de Questões:
          </label>
          <input
            type="number"
            id="numero-questoes"
            className="border border-gray-300 rounded p-2 w-full"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            min="1"
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Gerar Simulado"}
        </button>
      </form>
      <p className="text-center text-gray-700 mb-4">
        Foram encontradas {totalQuestions} questões para o cargo selecionado.
      </p>
      {isLoading ? (
        <p className="text-center">Carregando questões, por favor aguarde...</p>
      ) : (
        <div className="mt-6">
          {questions.length > 0 ? (
            questions.map((item, index) => (
              <QuestionCard key={index} question={item} index={index} />
            ))
          ) : (
            <p className="text-center">Nenhuma questão para exibir</p>
          )}
        </div>
      )}
    </section>
  );
};

export default SimuladoForm;
