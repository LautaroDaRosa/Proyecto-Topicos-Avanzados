import Button from 'app/components/Button';
import ButtonsContainer from '../styles/ButtonsContainer';
import ModalContent from '../styles/ModalContent';
import ModalTitle from '../styles/ModalTitle';
import QuestionSubtitle from '../styles/QuestionSubtitle';
import RowContainer from '../styles/RowContainer';
import StModal from '../styles/StModal';
import SubsectionContainer from '../styles/SubsectionContainer';
import QuestionTextContainer from '../styles/QuestionTextContainer';
import { useEffect, useState } from 'react';
import { getQuestions, sendAnswers } from 'store/form/api';
import { QuestionWithId } from 'types';
import { QuestionAnswer } from 'store/form/types';

interface CreateFormProps {
  isOpenned: boolean;
  setIsOpenned: (isOpenned: boolean) => void;
}

const AnswerFormModal = ({ isOpenned, setIsOpenned }: CreateFormProps) => {
  const [socialQuestions, setSocialQuestions] = useState<QuestionWithId[]>([]);
  const [environmentalQuestions, setEnvironmentalQuestions] = useState<
    QuestionWithId[]
  >([]);
  const [governanceQuestions, setGovernanceQuestions] = useState<
    QuestionWithId[]
  >([]);

  const [socialAnswers, setSocialAnswers] = useState<QuestionAnswer[]>([]);
  const [environmentAnswers, setEnvironmentAnswers] = useState<
    QuestionAnswer[]
  >([]);
  const [governanceAnswers, setGovernanceAnswers] = useState<QuestionAnswer[]>(
    [],
  );

  const closeModal = () => {
    setIsOpenned(false);
  };

  useEffect(() => {
    async function fetchQuestions() {
      const response = await getQuestions();
      const sQuestions = response.filter(
        question => question.categoryQuestion === 'SOCIAL',
      );
      setSocialQuestions(sQuestions);

      const eQuestions = response.filter(
        question => question.categoryQuestion === 'ENVIRONMENTAL',
      );
      setEnvironmentalQuestions(eQuestions);

      const gQuesitons = response.filter(
        question => question.categoryQuestion === 'GOVERNANCE',
      );
      setGovernanceQuestions(gQuesitons);
      setSocialAnswers(
        sQuestions.map(question => {
          return {
            question: question.questionId,
            response: 0,
          };
        }),
      );
      setEnvironmentAnswers(
        eQuestions.map(question => {
          return {
            question: question.questionId,
            response: 0,
          };
        }),
      );
      setGovernanceAnswers(
        gQuesitons.map(question => {
          return {
            question: question.questionId,
            response: 0,
          };
        }),
      );
    }
    fetchQuestions();
  }, []);

  const saveForm = () => {
    async function postAnswers() {
      await sendAnswers(
        socialAnswers.concat(governanceAnswers, environmentAnswers),
      );
    }
    postAnswers();
    closeModal();
  };

  const handleAnswerChange = (
    questionIndex: number,
    response: string,
    questionCategory: string,
  ) => {
    let updatedAnswers: QuestionAnswer[] = [];
    switch (questionCategory) {
      case 'SOCIAL':
        updatedAnswers = [...socialAnswers];
        updatedAnswers[questionIndex].response = parseInt(response);
        setSocialAnswers(updatedAnswers);
        break;
      case 'GOVERNANCE':
        updatedAnswers = [...governanceAnswers];
        updatedAnswers[questionIndex].response = parseInt(response);
        setGovernanceAnswers(updatedAnswers);
        break;
      case 'ENVIRONMENTAL':
        updatedAnswers = [...environmentAnswers];
        updatedAnswers[questionIndex].response = parseInt(response);
        setEnvironmentAnswers(updatedAnswers);
        break;
    }
  };

  return (
    <>
      {isOpenned && (
        <StModal>
          <ModalTitle>Contestar Formulario</ModalTitle>
          <span>Por favor, contesta todas las preguntas.</span>
          <ModalContent>
            <QuestionSubtitle>Social</QuestionSubtitle>
            <SubsectionContainer>
              {socialQuestions.map((question, index) => (
                <RowContainer key={`social-${index}`}>
                  <QuestionTextContainer>
                    <span>{question.text}</span>
                  </QuestionTextContainer>
                  {question.typeQuestion === 'TrueOrFalse' && (
                    <select
                      value={socialAnswers[index].response.toString()}
                      onChange={e =>
                        handleAnswerChange(index, e.target.value, 'SOCIAL')
                      }
                    >
                      <option value={'0'} key={'0'}>
                        F
                      </option>
                      <option value={'1'} key={'1'}>
                        V
                      </option>
                    </select>
                  )}
                  {question.typeQuestion === 'Ranking5' && (
                    <select
                      value={socialAnswers[index].response.toString()}
                      onChange={e =>
                        handleAnswerChange(index, e.target.value, 'SOCIAL')
                      }
                    >
                      <option value={'0'} key={'0'}>
                        1
                      </option>
                      <option value={'1'} key={'1'}>
                        2
                      </option>
                      <option value={'2'} key={'2'}>
                        3
                      </option>
                      <option value={'3'} key={'3'}>
                        4
                      </option>
                      <option value={'4'} key={'4'}>
                        5
                      </option>
                    </select>
                  )}
                </RowContainer>
              ))}
            </SubsectionContainer>
            <QuestionSubtitle>Ambiental</QuestionSubtitle>
            <SubsectionContainer>
              {environmentalQuestions.map((question, index) => (
                <RowContainer key={`environmental-${index}`}>
                  <QuestionTextContainer>
                    <span>{question.text}</span>
                  </QuestionTextContainer>
                  {question.typeQuestion === 'TrueOrFalse' && (
                    <select
                      value={environmentAnswers[index].response.toString()}
                      onChange={e =>
                        handleAnswerChange(
                          index,
                          e.target.value,
                          'ENVIRONMENTAL',
                        )
                      }
                    >
                      <option value={'0'} key={'0'}>
                        F
                      </option>
                      <option value={'1'} key={'1'}>
                        V
                      </option>
                    </select>
                  )}
                  {question.typeQuestion === 'Ranking5' && (
                    <select
                      value={environmentAnswers[index].response.toString()}
                      onChange={e =>
                        handleAnswerChange(
                          index,
                          e.target.value,
                          'ENVIRONMENTAL',
                        )
                      }
                    >
                      <option value={'0'} key={'0'}>
                        1
                      </option>
                      <option value={'1'} key={'1'}>
                        2
                      </option>
                      <option value={'2'} key={'2'}>
                        3
                      </option>
                      <option value={'3'} key={'3'}>
                        4
                      </option>
                      <option value={'4'} key={'4'}>
                        5
                      </option>
                    </select>
                  )}
                </RowContainer>
              ))}
            </SubsectionContainer>
            <QuestionSubtitle>Gobernanza</QuestionSubtitle>
            <SubsectionContainer>
              {governanceQuestions.map((question, index) => (
                <RowContainer key={`governance-${index}`}>
                  <QuestionTextContainer>
                    <span>{question.text}</span>
                  </QuestionTextContainer>
                  {question.typeQuestion === 'TrueOrFalse' && (
                    <select
                      value={governanceAnswers[index].response.toString()}
                      onChange={e =>
                        handleAnswerChange(index, e.target.value, 'GOVERNANCE')
                      }
                    >
                      <option value={'0'} key={'0'}>
                        F
                      </option>
                      <option value={'1'} key={'1'}>
                        V
                      </option>
                    </select>
                  )}
                  {question.typeQuestion === 'Ranking5' && (
                    <select
                      value={governanceAnswers[index].response.toString()}
                      onChange={e =>
                        handleAnswerChange(index, e.target.value, 'GOVERNANCE')
                      }
                    >
                      <option value={'0'} key={'0'}>
                        1
                      </option>
                      <option value={'1'} key={'1'}>
                        2
                      </option>
                      <option value={'2'} key={'2'}>
                        3
                      </option>
                      <option value={'3'} key={'3'}>
                        4
                      </option>
                      <option value={'4'} key={'4'}>
                        5
                      </option>
                    </select>
                  )}
                </RowContainer>
              ))}
            </SubsectionContainer>
          </ModalContent>
          <ButtonsContainer>
            <Button action="secondary" text="Cancelar" onClick={closeModal} />
            <Button action="primary" text="Guardar" onClick={saveForm} />
          </ButtonsContainer>
        </StModal>
      )}
    </>
  );
};

export default AnswerFormModal;
