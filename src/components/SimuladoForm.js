import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

const SimuladoForm = () => {
  const [cargoOptions, setCargoOptions] = useState({});
  const [selectedCargo, setSelectedCargo] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Função para normalizar strings (remove espaços e caracteres especiais, torna minúsculo)
  const normalizeString = (str) =>
    str.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");

  // Carrega a lista de cargos ao montar o componente
  useEffect(() => {
    const fetchCargos = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/hericmr/ConcurseiraPobre/master/public/mapa_cargos.json`
        );
        const cargoList = await response.json();
        
        setCargoOptions(cargoList);
        console.log("Opções de cargos carregadas:", cargoList);
      } catch (error) {
        console.error("Erro ao carregar a lista de cargos:", error);
        setErrorMessage("Erro ao carregar a lista de cargos. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCargos();
  }, []);

  const loadCargoData = async (cargo) => {
    setIsLoading(true);
    setErrorMessage("");
    setQuestions([]);

    try {
      const cargoFile = cargoOptions[cargo];
      if (!cargoFile) throw new Error("Cargo inválido.");

      const response = await fetch(
        `https://raw.githubusercontent.com/hericmr/ConcurseiraPobre/master/cargos_json/${cargoFile}`
      );
      if (!response.ok) throw new Error("Erro ao carregar dados.");

      const cargoData = await response.json();
      console.log("JSON completo do cargo carregado:", cargoData);

      // Normaliza o nome do cargo selecionado
      const normalizedCargo = normalizeString(cargo);

      // Encontra a chave correspondente no JSON usando a normalização
      const cargoKey = Object.keys(cargoData).find(
        (key) => normalizeString(key) === normalizedCargo
      );

      if (!cargoKey) throw new Error("Cargo não encontrado no JSON.");

      // Carrega as perguntas do cargo correto
      const perguntas = cargoData[cargoKey];
      if (!Array.isArray(perguntas)) {
        throw new Error("Estrutura de dados inesperada. Verifique o JSON.");
      }

      setQuestions(perguntas);
      setTotalQuestions(perguntas.length);

    } catch (error) {
      console.error("Erro ao carregar dados do cargo:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Gera as questões aleatórias para o simulado
  const handleGenerateQuestions = (e) => {
    e.preventDefault();
    if (!selectedCargo || questions.length === 0 || numQuestions <= 0) return;

    const selectedQuestions = [];
    const filteredData = [...questions];

    // Garante que o número de questões não exceda o total disponível
    const limit = Math.min(numQuestions, filteredData.length);

    for (let i = 0; i < limit; i++) {
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
              loadCargoData(e.target.value);
            }}
            disabled={isLoading}
          >
            <option value="">Selecione...</option>
            {Object.keys(cargoOptions).map((cargo) => (
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
            max={totalQuestions}
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Gerar Simulado"}
        </button>
      </form>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
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
