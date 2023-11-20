import Button from 'app/components/Button';
import { useEffect, useState } from 'react';
import { deleteQuestions, updateQuestions } from 'store/form/api';
import { Question, QuestionWithId } from 'types';
import QuestionsByTypeContainer from '../components/QuestionsByTypeContainer';
import ButtonsContainer from '../styles/ButtonsContainer';
import ModalContent from '../styles/ModalContent';
import ModalTitle from '../styles/ModalTitle';
import QuestionSubtitle from '../styles/QuestionSubtitle';
import SpecificationText from '../styles/SpecificationText';
import StModal from '../styles/StModal';
import SubsectionContainer from '../styles/SubsectionContainer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  fetchQuestions: () => void;
  sQuestions: QuestionWithId[];
  eQuestions: QuestionWithId[];
  gQuestions: QuestionWithId[];
}

const EditFormModal = ({
  isOpen,
  setIsOpen,
  sQuestions,
  eQuestions,
  gQuestions,
  fetchQuestions,
}: Props) => {
  function emptyQuestion(
    categoryQuestion: 'SOCIAL' | 'ENVIRONMENTAL' | 'GOVERNANCE',
  ) {
    return {
      questionId: -1,
      text: '',
      weight: '',
      categoryQuestion: categoryQuestion,
      typeQuestion: 'TrueOrFalse',
    };
  }

  const [socialQuestions, setSocialQuestions] = useState<QuestionWithId[]>([]);

  const [environmentQuestions, setEnvironmentQuestions] = useState<
    QuestionWithId[]
  >([]);

  const [governanceQuestions, setGovernanceQuestions] = useState<
    QuestionWithId[]
  >([]);

  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  useEffect(() => {
    setSocialQuestions(sQuestions);
    setEnvironmentQuestions(eQuestions);
    setGovernanceQuestions(gQuestions);
  }, [eQuestions, gQuestions, sQuestions]);

  const saveForm = () => {
    updateQuestions(
      socialQuestions.concat(environmentQuestions, governanceQuestions),
    )
      .then(() => deleteQuestions({ listQuestionId: deletedIds }))
      .then(() => fetchQuestions());
    setIsOpen(false);
    showToast();
  };

  const showToast = () => {
    toast.success('Formulario editado correctamente', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleQuestionChange = (
    index: number,
    value: string,
    categoryQuestion: 'SOCIAL' | 'ENVIRONMENTAL' | 'GOVERNANCE',
    field: 'text' | 'weight' | 'typeQuestion',
  ) => {
    let updatedQuestions: QuestionWithId[] = [];

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
        return weight !== 0;
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

  const deleteQuestion = (
    i: number,
    type: 'SOCIAL' | 'ENVIRONMENTAL' | 'GOVERNANCE',
  ) => {
    let id;
    switch (type) {
      case 'SOCIAL':
        setSocialQuestions(
          socialQuestions.filter(index => socialQuestions.indexOf(index) !== i),
        );
        id = socialQuestions[i].questionId;
        break;
      case 'ENVIRONMENTAL':
        setEnvironmentQuestions(
          environmentQuestions.filter(
            index => environmentQuestions.indexOf(index) !== i,
          ),
        );
        id = environmentQuestions[i].questionId;
        break;
      case 'GOVERNANCE':
        setGovernanceQuestions(
          governanceQuestions.filter(
            index => governanceQuestions.indexOf(index) !== i,
          ),
        );
        id = governanceQuestions[i].questionId;
        break;
    }
    if (id !== -1) {
      setDeletedIds([...deletedIds, id]);
    }
  };

  return (
    <>
      {isOpen && (
        <StModal>
          <ModalTitle>Editar Formulario</ModalTitle>
          <span>
            Agrega, modifica o elimina las preguntas y sus pesos porcentuales.
          </span>
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
                deleteQuestion={i => deleteQuestion(i, 'SOCIAL')}
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
                deleteQuestion={i => deleteQuestion(i, 'ENVIRONMENTAL')}
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
                deleteQuestion={i => deleteQuestion(i, 'GOVERNANCE')}
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

export default EditFormModal;
