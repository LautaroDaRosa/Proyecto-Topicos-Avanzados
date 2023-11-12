import Button from 'app/components/Button';
import { useState } from 'react';
import { postQuestions } from 'store/form/api';
import { Question } from 'types';
import QuestionsByTypeContainer from '../components/QuestionsByTypeContainer';
import ButtonsContainer from '../styles/ButtonsContainer';
import ModalContent from '../styles/ModalContent';
import ModalTitle from '../styles/ModalTitle';
import QuestionSubtitle from '../styles/QuestionSubtitle';
import SpecificationText from '../styles/SpecificationText';
import StModal from '../styles/StModal';
import SubsectionContainer from '../styles/SubsectionContainer';

interface Props {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  fetchQuestions: () => void;
}
const CreateFormModal = ({ isOpen, setIsOpen, fetchQuestions }: Props) => {
  function emptyQuestion(
    categoryQuestion: 'SOCIAL' | 'ENVIRONMENTAL' | 'GOVERNANCE',
  ) {
    return {
      text: '',
      weight: '',
      categoryQuestion: categoryQuestion,
      typeQuestion: 'TrueOrFalse',
    };
  }

  const [socialQuestions, setSocialQuestions] = useState<Question[]>([
    emptyQuestion('SOCIAL'),
  ]);

  const [environmentQuestions, setEnvironmentQuestions] = useState<Question[]>([
    emptyQuestion('ENVIRONMENTAL'),
  ]);

  const [governanceQuestions, setGovernanceQuestions] = useState<Question[]>([
    emptyQuestion('GOVERNANCE'),
  ]);

  const saveForm = () => {
    postQuestions(
      socialQuestions.concat(environmentQuestions, governanceQuestions),
    ).then(() => fetchQuestions());
    setIsOpen(false);
  };

  const handleQuestionChange = (
    index: number,
    value: string,
    categoryQuestion: 'SOCIAL' | 'ENVIRONMENTAL' | 'GOVERNANCE',
    field: 'text' | 'weight' | 'typeQuestion',
  ) => {
    let updatedQuestions: Question[] = [];

    switch (categoryQuestion) {
      case 'SOCIAL':
        updatedQuestions = [...socialQuestions];
        break;
      case 'ENVIRONMENTAL':
        updatedQuestions = [...environmentQuestions];
        break;
      case 'GOVERNANCE':
        updatedQuestions = [...governanceQuestions];
        break;
      default:
        return;
    }

    switch (field) {
      case 'text':
        updatedQuestions[index].text = value as string;
        break;
      case 'weight':
        if (value === '' || !isNaN(Number(value))) {
          updatedQuestions[index].weight = value as string;
        }
        break;
      case 'typeQuestion':
        updatedQuestions[index].typeQuestion = value as string;
        break;
      default:
        return;
    }

    switch (categoryQuestion) {
      case 'SOCIAL':
        setSocialQuestions(updatedQuestions);
        break;
      case 'ENVIRONMENTAL':
        setEnvironmentQuestions(updatedQuestions);
        break;
      case 'GOVERNANCE':
        setGovernanceQuestions(updatedQuestions);
        break;
    }
  };

  function areInputsValid(): boolean {
    const allTextFieldsNotEmpty =
      socialQuestions.every(q => q.text.trim() !== '') &&
      environmentQuestions.every(q => q.text.trim() !== '') &&
      governanceQuestions.every(q => q.text.trim() !== '');

    const isWeightValid = (questions: Question[]): boolean => {
      return questions.every(q => {
        const weight = parseInt(q.weight);
        return !isNaN(weight) && weight !== 0 && q.weight.trim() !== '';
      });
    };

    const isSocialWeightValid = isWeightValid(socialQuestions);
    const isEnvironmentWeightValid = isWeightValid(environmentQuestions);
    const isGovernanceWeightValid = isWeightValid(governanceQuestions);

    const socialWeightSum = socialQuestions.reduce(
      (acc, q) => acc + parseInt(q.weight),
      0,
    );
    const environmentWeightSum = environmentQuestions.reduce(
      (acc, q) => acc + parseInt(q.weight),
      0,
    );
    const governanceWeightSum = governanceQuestions.reduce(
      (acc, q) => acc + parseInt(q.weight),
      0,
    );

    const isSumValid =
      socialWeightSum === 100 &&
      environmentWeightSum === 100 &&
      governanceWeightSum === 100;

    return (
      allTextFieldsNotEmpty &&
      isSocialWeightValid &&
      isEnvironmentWeightValid &&
      isGovernanceWeightValid &&
      isSumValid
    );
  }

  return (
    <>
      {isOpen && (
        <StModal>
          <ModalTitle>Crear Formulario</ModalTitle>
          <span>Agrega las preguntas y sus pesos porcentuales.</span>
          <SpecificationText>
            Por cada sección, la suma de todos los pesos debe ser 100.
          </SpecificationText>
          <ModalContent>
            <QuestionSubtitle>Social</QuestionSubtitle>
            <SubsectionContainer>
              <QuestionsByTypeContainer
                questionsType="SOCIAL"
                questions={socialQuestions}
                handleQuestionChange={handleQuestionChange}
                deleteQuestion={index =>
                  setSocialQuestions(
                    socialQuestions.filter(
                      i => socialQuestions.indexOf(i) !== index,
                    ),
                  )
                }
              />
              <Button
                action="link"
                text="Agregar pregunta +"
                onClick={() =>
                  setSocialQuestions([
                    ...socialQuestions,
                    emptyQuestion('SOCIAL'),
                  ])
                }
              />
            </SubsectionContainer>
            <QuestionSubtitle>Ambiental</QuestionSubtitle>
            <SubsectionContainer>
              <QuestionsByTypeContainer
                questionsType="ENVIRONMENTAL"
                questions={environmentQuestions}
                handleQuestionChange={handleQuestionChange}
                deleteQuestion={index =>
                  setEnvironmentQuestions(
                    environmentQuestions.filter(
                      i => environmentQuestions.indexOf(i) !== index,
                    ),
                  )
                }
              />
              <Button
                action="link"
                text="Agregar pregunta +"
                onClick={() =>
                  setEnvironmentQuestions([
                    ...environmentQuestions,
                    emptyQuestion('ENVIRONMENTAL'),
                  ])
                }
              />
            </SubsectionContainer>
            <QuestionSubtitle>Gobernanza</QuestionSubtitle>
            <SubsectionContainer>
              <QuestionsByTypeContainer
                questionsType="GOVERNANCE"
                questions={governanceQuestions}
                handleQuestionChange={handleQuestionChange}
                deleteQuestion={index =>
                  setGovernanceQuestions(
                    governanceQuestions.filter(
                      i => governanceQuestions.indexOf(i) !== index,
                    ),
                  )
                }
              />
              <Button
                action="link"
                text="Agregar pregunta +"
                onClick={() =>
                  setGovernanceQuestions([
                    ...governanceQuestions,
                    emptyQuestion('GOVERNANCE'),
                  ])
                }
              />
            </SubsectionContainer>
          </ModalContent>
          <ButtonsContainer>
            <Button
              action="secondary"
              text="Cancelar"
              onClick={() => setIsOpen(false)}
            />
            <Button
              action="primary"
              text="Guardar"
              disabled={!areInputsValid()}
              onClick={saveForm}
            />
          </ButtonsContainer>
        </StModal>
      )}
    </>
  );
};

export default CreateFormModal;
