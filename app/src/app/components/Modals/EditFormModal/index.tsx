import Button from 'app/components/Button';
import StModal from '../styles/StModal';
import ButtonsContainer from '../styles/ButtonsContainer';
import ModalTitle from '../styles/ModalTitle';
import QuestionSubtitle from '../styles/QuestionSubtitle';
import { useEffect, useState } from 'react';
import { Question, QuestionWithId } from 'types';
import SubsectionContainer from '../styles/SubsectionContainer';
import QuestionInput from '../styles/QuestionInput';
import RowContainer from '../styles/RowContainer';
import WeightInput from '../styles/WeightInput';
import ModalContent from '../styles/ModalContent';
import SpecificationText from '../styles/SpecificationText';
import { updateQuestions } from 'store/form/api';

interface EditFormProps {
  isOpenned: boolean;
  setIsOpenned: (isOpenned: boolean) => void;
  sQuestions: QuestionWithId[];
  eQuestions: QuestionWithId[];
  gQuestions: QuestionWithId[];
}

const EditFormModal = ({
  isOpenned,
  setIsOpenned,
  sQuestions,
  eQuestions,
  gQuestions,
}: EditFormProps) => {
  const closeModal = () => {
    setIsOpenned(false);
  };

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

  useEffect(() => {
    setSocialQuestions(sQuestions);
    setEnvironmentQuestions(eQuestions);
    setGovernanceQuestions(gQuestions);
  }, [eQuestions, gQuestions, sQuestions]);

  const saveForm = () => {
    updateQuestions(
      socialQuestions.concat(environmentQuestions, governanceQuestions),
    );
    closeModal();
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

  return (
    <>
      {isOpenned && (
        <StModal>
          <ModalTitle>Crear Formulario</ModalTitle>
          <span>Agrega las preguntas y sus pesos porcentuales.</span>
          <SpecificationText>
            Por cada sección, la suma de todos los pesos debe ser 100.
          </SpecificationText>
          <ModalContent>
            <QuestionSubtitle>Social</QuestionSubtitle>
            <SubsectionContainer>
              {socialQuestions.map((question, index) => (
                <RowContainer key={`social-${index}`}>
                  <QuestionInput
                    value={question.text}
                    placeholder="Ingrese el texto de la pregunta"
                    onChange={e =>
                      handleQuestionChange(
                        index,
                        e.target.value,
                        'SOCIAL',
                        'text',
                      )
                    }
                  />
                  <WeightInput
                    value={question.weight}
                    placeholder="%"
                    onChange={e =>
                      e.target.value.length <= 3
                        ? handleQuestionChange(
                            index,
                            e.target.value,
                            'SOCIAL',
                            'weight',
                          )
                        : null
                    }
                  />
                  <select
                    value={question.typeQuestion}
                    onChange={e =>
                      handleQuestionChange(
                        index,
                        e.target.value,
                        'SOCIAL',
                        'typeQuestion',
                      )
                    }
                  >
                    <option value={'TrueOrFalse'} key={'TrueOrFalse'}>
                      V o F
                    </option>
                    <option value={'Ranking5'} key={'Ranking5'}>
                      Ranking
                    </option>
                  </select>
                </RowContainer>
              ))}
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
              {environmentQuestions.map((question, index) => (
                <RowContainer key={`environmental-${index}`}>
                  <QuestionInput
                    value={question.text}
                    placeholder="Ingrese el texto de la pregunta"
                    onChange={e =>
                      handleQuestionChange(
                        index,
                        e.target.value,
                        'ENVIRONMENTAL',
                        'text',
                      )
                    }
                  />
                  <WeightInput
                    value={question.weight}
                    placeholder="%"
                    onChange={e =>
                      e.target.value.length <= 3
                        ? handleQuestionChange(
                            index,
                            e.target.value,
                            'ENVIRONMENTAL',
                            'weight',
                          )
                        : null
                    }
                  />
                  <select
                    value={question.typeQuestion}
                    onChange={e =>
                      handleQuestionChange(
                        index,
                        e.target.value,
                        'ENVIRONMENTAL',
                        'typeQuestion',
                      )
                    }
                  >
                    <option value={'TrueOrFalse'} key={'TrueOrFalse'}>
                      V o F
                    </option>
                    <option value={'Ranking5'} key={'Ranking5'}>
                      Ranking
                    </option>
                  </select>
                </RowContainer>
              ))}
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
              {governanceQuestions.map((question, index) => (
                <RowContainer key={`governance-${index}`}>
                  <QuestionInput
                    value={question.text}
                    placeholder="Ingrese el texto de la pregunta"
                    onChange={e =>
                      handleQuestionChange(
                        index,
                        e.target.value,
                        'GOVERNANCE',
                        'text',
                      )
                    }
                  />
                  <WeightInput
                    value={question.weight}
                    placeholder="%"
                    onChange={e =>
                      e.target.value.length <= 3
                        ? handleQuestionChange(
                            index,
                            e.target.value,
                            'GOVERNANCE',
                            'weight',
                          )
                        : null
                    }
                  />
                  <select
                    value={question.typeQuestion}
                    onChange={e =>
                      handleQuestionChange(
                        index,
                        e.target.value,
                        'GOVERNANCE',
                        'typeQuestion',
                      )
                    }
                  >
                    <option value={'TrueOrFalse'} key={'TrueOrFalse'}>
                      V o F
                    </option>
                    <option value={'Ranking5'} key={'Ranking5'}>
                      Ranking
                    </option>
                  </select>
                </RowContainer>
              ))}
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
            <Button action="secondary" text="Cancelar" onClick={closeModal} />
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
