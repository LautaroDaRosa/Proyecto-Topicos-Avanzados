import { Question, QuestionWithId } from 'types';
import { axiosInstance } from 'utils/axios';
import { toCamel } from 'utils/convert-keys';
import { ANSWER, QUESTION } from './endpoints';
import { QuestionAnswer } from './types';

export const postQuestions = async (questions: Question[]) => {
  const response = await axiosInstance.post(QUESTION, questions);
  return toCamel(response.data);
};

export const getQuestions = async () => {
  const response = await axiosInstance.get(QUESTION);
  return toCamel(response.data as QuestionWithId[]);
};

export const sendAnswers = async (answers: QuestionAnswer[]) => {
  const response = await axiosInstance.post(`${ANSWER}/send`, answers);
  return toCamel(response.data);
};

const authApi = {
  postQuestions,
  getQuestions,
  sendAnswers,
};

export default authApi;
