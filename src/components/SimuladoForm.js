import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

const SimuladoForm = () => {
  const [cargoOptions, setCargoOptions] = useState({});
  const [filteredCargoOptions, setFilteredCargoOptions] = useState([]);
  const [selectedCargos, setSelectedCargos] = useState([]); // Store multiple selected cargos
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to control dropdown visibility

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

  const loadCargoData = async (cargos) => {
    setIsLoading(true);
    setErrorMessage("");
    setQuestions([]);
    let aggregatedQuestions = [];

    try {
      for (const cargo of cargos) {
        const cargoFile = cargoOptions[cargo];
        if (!cargoFile) continue; // Skip if no file for cargo

        const response = await fetch(
          `https://raw.githubusercontent.com/hericmr/ConcurseiraPobre/master/cargos_json/${cargoFile}`
        );
        if (!response.ok) throw new Error("Erro ao carregar dados.");

        const cargoData = await response.json();

        const normalizedCargo = normalizeString(cargo);
        const cargoKey = Object.keys(cargoData).find(
          (key) => normalizeString(key) === normalizedCargo
        );

        if (!cargoKey) continue;

        const perguntas = cargoData[cargoKey];
        if (Array.isArray(perguntas)) {
          aggregatedQuestions = [...aggregatedQuestions, ...perguntas];
        }
      }

      setQuestions(aggregatedQuestions);
      setTotalQuestions(aggregatedQuestions.length);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCargoInput = (e) => {
    const input = e.target.value;

    const filtered = Object.keys(cargoOptions)
      .filter((cargo) =>
        normalizeString(cargo).includes(normalizeString(input))
      )
      .sort();

    setFilteredCargoOptions(filtered);
    setIsDropdownVisible(true); // Show dropdown when user starts typing
  };

  const handleSelectCargo = (cargo) => {
    // Add selected cargo to the list if not already selected
    if (!selectedCargos.includes(cargo)) {
      const newSelectedCargos = [...selectedCargos, cargo];
      setSelectedCargos(newSelectedCargos);
      loadCargoData(newSelectedCargos); // Load data for all selected cargos
    }
    setFilteredCargoOptions([]);
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  const handleRemoveCargo = (cargoToRemove) => {
    const newSelectedCargos = selectedCargos.filter(
      (cargo) => cargo !== cargoToRemove
    );
    setSelectedCargos(newSelectedCargos);
    loadCargoData(newSelectedCargos); // Reload data without the removed cargo
  };

  const handleGenerateQuestions = (e) => {
    e.preventDefault();
    if (selectedCargos.length === 0 || questions.length === 0 || numQuestions <= 0) return;

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
            Selecione os Cargos:
          </label>
          <input
            type="text"
            id="cargo"
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleCargoInput}
            onFocus={() => setIsDropdownVisible(true)} // Show dropdown on focus
            onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)} // Hide dropdown on blur with delay
            disabled={isLoading}
            placeholder="Digite para pesquisar..."
          />
          {/* Dropdown for filtered cargo options */}
          {isDropdownVisible && filteredCargoOptions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto z-10 shadow-lg">
              {filteredCargoOptions.map((cargo) => (
                <li
                  key={cargo}
                  onClick={() => handleSelectCargo(cargo)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {cargo}
                </li>
              ))}
            </ul>
          )}
          {/* Display selected cargos as tags */}
          {selectedCargos.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedCargos.map((cargo) => (
                <span
                  key={cargo}
                  className="bg-gray-400 text-black p-3 rounded-full flex items-center"
                >
                  {cargo}
                  <button
                    onClick={() => handleRemoveCargo(cargo)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-gray-700 text-white px-6 py-3 rounded w-2/3 md:w-1/2"
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Filtrar Questões"}
          </button>
        </div>
      </form>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      <p className="text-center text-gray-700 mb-4">
        Foram encontradas {totalQuestions} questões para os cargos selecionados.
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
            <p className="text-center">Atualmente o site conta com 88533 questões da banca Avança-SP</p>
          )}
        </div>
      )}
    </section>
  );
};

export default SimuladoForm;
