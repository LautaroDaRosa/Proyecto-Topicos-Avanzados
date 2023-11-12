import { Question, QuestionWithId } from 'types';
import { axiosInstance } from 'utils/axios';
import { toCamel } from 'utils/convert-keys';
import { ANSWER, QUESTION } from './endpoints';
import { ListQuestionId, QuestionAnswer } from './types';
import { AxiosRequestConfig } from 'axios';

export const postQuestions = async (questions: Question[]) => {
  const response = await axiosInstance.post(QUESTION, questions);
  return toCamel(response.data);
};

export const updateQuestions = async (questions: QuestionWithId[]) => {
  const bodyRequest = questions.map(question =>
    question.questionId === -1 ? { ...question, questionId: null } : question,
  );
  const response = await axiosInstance.post(QUESTION, bodyRequest);
  return toCamel(response.data);
};

export const getQuestions = async () => {
  const response = await axiosInstance.get(QUESTION);
  return toCamel(response.data as QuestionWithId[]);
};

export const deleteQuestions = async (questionIds: ListQuestionId) => {
  const config: AxiosRequestConfig = {
    url: QUESTION,
    method: 'delete',
    data: questionIds,
  };

  const response = await axiosInstance(config);
  return response.data as boolean;
};

export const sendAnswers = async (answers: QuestionAnswer[]) => {
  const response = await axiosInstance.post(`${ANSWER}/send`, answers);
  return toCamel(response.data);
};

export const getAnswered = async () => {
  const response = await axiosInstance.get(`${ANSWER}/answered`);
  return response.data as QuestionAnswer[];
};

const authApi = {
  postQuestions,
  getQuestions,
  sendAnswers,
  getAnswered,
};

export default authApi;
