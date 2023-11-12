import { Question } from 'types';
import trashCan from '../../../../resources/trash.svg';
import RowContainer from '../styles/RowContainer';
import QuestionInput from '../styles/QuestionInput';
import WeightInput from '../styles/WeightInput';
import TrashContainer from '../styles/TrashContainer';

interface Props {
  questionsType: 'SOCIAL' | 'ENVIRONMENTAL' | 'GOVERNANCE';
  questions: Question[];
  handleQuestionChange: (
    index: number,
    targetValue: string,
    categoryQuestion: 'SOCIAL' | 'ENVIRONMENTAL' | 'GOVERNANCE',
    field: 'text' | 'weight' | 'typeQuestion',
  ) => void;
  deleteQuestion: (index) => void;
}

const QuestionsByTypeContainer = ({
  questionsType,
  questions,
  handleQuestionChange,
  deleteQuestion,
}: Props) => {
  return (
    <>
      {questions.map((question, index) => (
        <RowContainer key={`${questionsType}-${index}`}>
          <QuestionInput
            value={question.text}
            placeholder="Ingrese el texto de la pregunta"
            onChange={e =>
              handleQuestionChange(index, e.target.value, questionsType, 'text')
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
                    questionsType,
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
                questionsType,
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
          <TrashContainer
            isDeletable={questions.length > 1}
            onClick={() => questions.length > 1 && deleteQuestion(index)}
          >
            <img src={trashCan} alt="Boton eliminar"></img>
          </TrashContainer>
        </RowContainer>
      ))}
    </>
  );
};

export default QuestionsByTypeContainer;
