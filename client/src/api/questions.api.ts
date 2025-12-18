import api from "./axios";

export const getQuestions = (subject: string) => 
  api.get(`/api/practice/${subject}`);

export const getQuestionsByYear = (subject: string, year: string) =>
  api.get(`/api/practice/${subject}/year/${year}`);