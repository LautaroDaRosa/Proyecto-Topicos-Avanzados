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
  categories: string[];
}

const FilterBar = ({ onSearch, clearFilters, categories }: FilterBarProps) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [rut, setRut] = useState('');
  const [category, setCategory] = useState('');
  const [score, setScore] = useState('');

  const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
        {scores.map(score => (
          <option value={score} key={score}>
            {score}
          </option>
        ))}
      </select>

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="" disabled>
          Rubro
        </option>
        {categories.map(cat => (
          <option value={cat} key={cat}>
            {cat}
          </option>
        ))}
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
