import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface FilterProps {
  breweryTypes: string[]; // Array contendo os tipos de cervejaria disponíveis
  onSelectChange: (value: string) => void; // Função para lidar com a mudança de seleção
}

const Filter: React.FC<FilterProps> = ({ breweryTypes, onSelectChange }) => {
  const [selectedType, setSelectedType] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setSelectedType(value);
    onSelectChange(value); // Chama a função para lidar com a mudança de seleção
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="brewery-type-select-label">Select Brewery Type</InputLabel>
      <Select
        labelId="brewery-type-select-label"
        id="brewery-type-select"
        value={selectedType}
        label="Select Brewery Type"
        onChange={handleChange}
      >
        <MenuItem value="">All</MenuItem>
        {breweryTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
