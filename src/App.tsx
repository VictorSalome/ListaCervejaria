import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Filter from "./components/Filter";
import { Header } from "./components/Header";
import { ApiConnection } from "./services/ApiConnection";
import { IBreweries } from "./interface/breweriesInterface";
import { SimpleGrid } from "@chakra-ui/react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ModalInfo from "./components/Modal"; // Importe o componente ModalInfo

function App() {
  const [breweries, setBreweries] = useState<IBreweries[]>([]);
  const [breweryTypes, setBreweryTypes] = useState<string[]>([]);
  const [filteredBreweries, setFilteredBreweries] = useState<IBreweries[]>([]); // Estado para armazenar cervejarias filtradas
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<IBreweries | null>(null); // Estado para armazenar o card selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
  const itemsPerPage = 20; // Define a quantidade de itens por página

  useEffect(() => {
    const loadingInfo = async () => {
      const info = await ApiConnection();
      setBreweries(info);

      // Extrair tipos únicos de cervejarias da lista e atualizar o estado breweryTypes
      const uniqueTypes: string[] = [
        ...new Set(info.map((item) => item.brewery_type)),
      ];
      setBreweryTypes(uniqueTypes);
    };

    loadingInfo();
  }, []);

  useEffect(() => {
    // Lógica para dividir as cervejarias de acordo com a página selecionada
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const slicedBreweries = breweries.slice(firstIndex, lastIndex);
    setFilteredBreweries(slicedBreweries);
  }, [breweries, currentPage]);

  // Função para lidar com a mudança de página
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Função para lidar com a mudança de seleção de tipo de cervejaria
  const handleTypeChange = (selectedType: string) => {
    if (selectedType === "") {
      // Se nenhum tipo selecionado, exibir todas as cervejarias
      setFilteredBreweries(breweries);
    } else {
      // Filtrar as cervejarias com base no tipo selecionado
      const filtered = breweries.filter(
        (item) => item.brewery_type === selectedType
      );
      setFilteredBreweries(filtered);
    }
  };

  // Função para lidar com o clique em um card
  const handleCardClick = (brewery: IBreweries) => {
    setSelectedCard(brewery);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="flex flex-row p-3">
        <h1 className="flex py-3">Filter</h1>
        {/* Passe os breweryTypes e a função handleTypeChange para o componente Filter */}
        <Filter breweryTypes={breweryTypes} onSelectChange={handleTypeChange} />
      </div>

      <SimpleGrid minChildWidth="340px" spacing="0px">
        {/* Renderize as cervejarias filtradas ao invés de 'breweries' */}
        {filteredBreweries.map((item) => {
          return (
            <Card
              key={item.id}
              brewery={item}
              onClick={() => handleCardClick(item)}
            />
          );
        })}
      </SimpleGrid>

      {/* Utilize o componente ModalInfo */}
      <ModalInfo
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedCard={selectedCard}
      />

      {/* Adiciona a paginação abaixo dos cards */}
      <Stack spacing={2} justifyContent="center" alignItems="center" mt={3}>
        <Pagination
          count={Math.ceil(breweries.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </>
  );
}

export default App;
