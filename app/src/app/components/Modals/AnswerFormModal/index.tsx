import Button from 'app/components/Button';
import ButtonsContainer from '../styles/ButtonsContainer';
import ModalContent from '../styles/ModalContent';
import ModalTitle from '../styles/ModalTitle';
import QuestionSubtitle from '../styles/QuestionSubtitle';
import RowContainer from '../styles/RowContainer';
import StModal from '../styles/StModal';
import SubsectionContainer from '../styles/SubsectionContainer';
import QuestionTextContainer from '../styles/QuestionTextContainer';

interface CreateFormProps {
  isOpenned: boolean;
  setIsOpenned: (isOpenned: boolean) => void;
}

const AnswerFormModal = ({ isOpenned, setIsOpenned }: CreateFormProps) => {
  const closeModal = () => {
    setIsOpenned(false);
  };

  // LLamar al endpoint para obtener las respuestas
  const socialQuestions = [
    {
      questionId: 4,
      categoryQuestion: 'SOCIAL',
      weight: 100,
      text: 'Pregunta prueba Cambio',
      typeQuestion: 'Ranking5',
    },
  ];

  const environmentalQuestions = [
    {
      questionId: 1,
      categoryQuestion: 'ENVIRONMENTAL',
      weight: 100,
      text: 'Pregunta prueba',
      typeQuestion: 'TrueOrFalse',
    },
    {
      questionId: 2,
      categoryQuestion: 'ENVIRONMENTAL',
      weight: 100,
      text: 'Pregunta prueba',
      typeQuestion: 'TrueOrFalse',
    },
    {
      questionId: 3,
      categoryQuestion: 'ENVIRONMENTAL',
      weight: 100,
      text: 'Pregunta prueba',
      typeQuestion: 'TrueOrFalse',
    },
  ];

  const governanceQuestions = [
    {
      questionId: 6,
      categoryQuestion: 'GOVERNANCE',
      weight: 40,
      text: 'Pregunta prueba',
      typeQuestion: 'Ranking5',
    },
    {
      questionId: 7,
      categoryQuestion: 'GOVERNANCE',
      weight: 60,
      text: 'Pregunta prueba',
      typeQuestion: 'Ranking5',
    },
    {
      questionId: 8,
      categoryQuestion: 'GOVERNANCE',
      weight: 60,
      text: 'Pregunta prueba',
      typeQuestion: 'Ranking5',
    },
    {
      questionId: 9,
      categoryQuestion: 'GOVERNANCE',
      weight: 60,
      text: 'Pregunta prueba',
      typeQuestion: 'Ranking5',
    },
    {
      questionId: 10,
      categoryQuestion: 'GOVERNANCE',
      weight: 60,
      text: 'Pregunta prueba',
      typeQuestion: 'Ranking5',
    },
  ];

  const socialAnswers = socialQuestions.map(question => {
    return {
      question: question.questionId,
      response: 0,
    };
  });

  const environmentAnswers = environmentalQuestions.map(question => {
    return {
      question: question.questionId,
      response: 0,
    };
  });

  const governanceAnswers = governanceQuestions
    .filter(q => q.categoryQuestion === 'GOVERNANCE')
    .map(question => {
      return {
        question: question.questionId,
        response: 0,
      };
    });

  console.log(socialAnswers);
  console.log(environmentAnswers);
  console.log(governanceAnswers);

  const saveForm = () => {
    // Send request to endpoint. En .then avisar al padre que el formulario ya se hizo.
    closeModal();
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
                      value={socialAnswers[index].toString()}
                      /* onChange={e =>
                        handleAnswerChange(
                          index,
                          e.target.value,
                          'SOCIAL',
                          'response',
                        )
                      } */
                    >
                      <option value={'0'} key={'0'}>
                        Falso
                      </option>
                      <option value={'1'} key={'1'}>
                        Verdadero
                      </option>
                    </select>
                  )}
                  {question.typeQuestion === 'Ranking5' && (
                    <select
                      value={socialAnswers[index].toString()}
                      /* onChange={e =>
                        handleAnswerChange(
                          index,
                          e.target.value,
                          'SOCIAL',
                          'response',
                        )
                      } */
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
                      value={environmentAnswers[index].toString()}
                      /* onChange={e =>
                        handleAnswerChange(
                          index,
                          e.target.value,
                          'SOCIAL',
                          'response',
                        )
                      } */
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
                      value={environmentAnswers[index].toString()}
                      /* onChange={e =>
                        handleAnswerChange(
                          index,
                          e.target.value,
                          'SOCIAL',
                          'response',
                        )
                      } */
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
                      value={governanceAnswers[index].toString()}
                      /* onChange={e =>
                        handleAnswerChange(
                          index,
                          e.target.value,
                          'SOCIAL',
                          'response',
                        )
                      } */
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
                      value={governanceAnswers[index].toString()}
                      /* onChange={e =>
                        handleAnswerChange(
                          index,
                          e.target.value,
                          'SOCIAL',
                          'response',
                        )
                      } */
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
