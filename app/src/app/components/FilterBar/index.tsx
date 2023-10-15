import { useState } from 'react';
import Button from '../Button';
import StFilterBar from './StFilterBar';

interface FilterBarProps {
  onSearch: (
    name: string,
    businessName: string,
    rut: string,
    score: string,
    category: string,
  ) => void;
  clearFilters: () => void;
}

const FilterBar = ({ onSearch, clearFilters }: FilterBarProps) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [rut, setRut] = useState('');
  const [category, setCategory] = useState('');
  const [score, setScore] = useState('');

  const clearAllFilters = () => {
    setName('');
    setBusinessName('');
    setRut('');
    setCategory('');
    setScore('');
    clearFilters();
  };

  const emptyFilters =
    name === '' &&
    businessName === '' &&
    rut === '' &&
    category === '' &&
    score === '';

  const handleSearch = () => {
    onSearch(name, businessName, rut, score, category);
  };

  return (
    <StFilterBar>
      <input
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
      ></input>
      <input
        placeholder="Razon social"
        value={businessName}
        onChange={e => setBusinessName(e.target.value)}
      ></input>
      <input
        placeholder="RUT"
        value={rut}
        onChange={e => setRut(e.target.value)}
      ></input>
      <select value={score} onChange={e => setScore(e.target.value)}>
        <option value="" disabled>
          Score
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="" disabled>
          Rubro
        </option>
        <option value="Comunicaciones, Publicidad">
          Comunicaciones, Publicidad
        </option>
        <option value="Servicios Financieros y Afines">
          Servicios Financieros y Afines
        </option>
      </select>
      <div style={{ gap: '8px', display: 'flex' }}>
        <Button
          text="Limpiar"
          type="submit"
          action="secondary"
          onClick={clearAllFilters}
        />
        <Button
          text="Buscar"
          type="submit"
          action="primary"
          onClick={handleSearch}
          disabled={emptyFilters}
        />
      </div>
    </StFilterBar>
  );
};

export default FilterBar;
