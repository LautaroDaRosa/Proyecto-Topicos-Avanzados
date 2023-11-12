// CategoriesModal.js

import styled from 'styled-components';
import StModal from '../styles/StModal';
import ModalTitle from '../styles/ModalTitle';
import { useEffect, useState } from 'react';
import { getCategories, updateCategories } from 'store/providers/api';
import ButtonsContainer from '../styles/ButtonsContainer';
import Button from 'app/components/Button';

const CheckBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  gap: 8px;
  padding: 32px;
`;

const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 350px;
`;

const CheckBoxInput = styled.input`
  margin-right: 8px;
  &:checked {
    background-color: #04b0f4;
    border-color: #04b0f4;
  }
`;

interface Props {
  preselectedCategories: string[];
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  fetchProfile: () => void;
}

const CategoriesModal = ({
  preselectedCategories,
  isOpen,
  setIsOpen,
  fetchProfile,
}: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();
      setCategories(response);
    }
    fetchCategories();
    setSelectedCategories(preselectedCategories);
  }, [preselectedCategories]);

  const handleCheckBoxChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const saveCategories = () => {
    async function editCategories() {
      await updateCategories(selectedCategories).then(fetchProfile);
    }
    editCategories().then(fetchProfile);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <StModal>
          <ModalTitle>Editar categorías</ModalTitle>
          <CheckBoxContainer>
            {categories.map(category => (
              <CheckBoxLabel key={category}>
                <CheckBoxInput
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckBoxChange(category)}
                />
                <span>{category}</span>
              </CheckBoxLabel>
            ))}
          </CheckBoxContainer>
          <ButtonsContainer>
            <Button
              action="secondary"
              text="Cancelar"
              onClick={() => setIsOpen(false)}
            />
            <Button action="primary" text="Guardar" onClick={saveCategories} />
          </ButtonsContainer>
        </StModal>
      )}
    </>
  );
};

export default CategoriesModal;
