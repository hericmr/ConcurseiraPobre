import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

const SimuladoForm = () => {
  const [cargoOptions, setCargoOptions] = useState({});
  const [filteredCargoOptions, setFilteredCargoOptions] = useState([]);
  const [selectedCargo, setSelectedCargo] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const normalizeString = (str) =>
    str.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");

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
        setFilteredCargoOptions(Object.keys(cargoList).sort());
      } catch (error) {
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

      const normalizedCargo = normalizeString(cargo);
      const cargoKey = Object.keys(cargoData).find(
        (key) => normalizeString(key) === normalizedCargo
      );

      if (!cargoKey) throw new Error("Cargo não encontrado no JSON.");

      const perguntas = cargoData[cargoKey];
      if (!Array.isArray(perguntas)) {
        throw new Error("Estrutura de dados inesperada. Verifique o JSON.");
      }

      setQuestions(perguntas);
      setTotalQuestions(perguntas.length);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCargoInput = (e) => {
    const input = e.target.value;
    setSelectedCargo(input);

    const filtered = Object.keys(cargoOptions)
      .filter((cargo) =>
        normalizeString(cargo).includes(normalizeString(input))
      )
      .sort();

    setFilteredCargoOptions(filtered);

    if (cargoOptions[input]) {
      loadCargoData(input);
    }
  };

  const handleGenerateQuestions = (e) => {
    e.preventDefault();
    if (!selectedCargo || questions.length === 0 || numQuestions <= 0) return;

    const selectedQuestions = [];
    const filteredData = [...questions];
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
        <div className="mb-4 relative">
          <label htmlFor="cargo" className="block text-gray-700">
            Selecione o Cargo:
          </label>
          <input
            type="text"
            id="cargo"
            className="border border-gray-300 rounded p-2 w-full"
            value={selectedCargo}
            onChange={handleCargoInput}
            disabled={isLoading}
            placeholder="Digite para pesquisar..."
          />
          {selectedCargo && filteredCargoOptions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto">
              {filteredCargoOptions.map((cargo) => (
                <li
                  key={cargo}
                  onClick={() => {
                    setSelectedCargo(cargo);
                    loadCargoData(cargo);
                    setFilteredCargoOptions([]);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {cargo}
                </li>
              ))}
            </ul>
          )}
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
