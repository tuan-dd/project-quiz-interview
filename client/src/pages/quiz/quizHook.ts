import { useContext } from 'react';
import { QuizContext } from './context/quizCtx';
import { ICreateQuizCompleteInput } from '@/types/servicesType';
import { IFormPlayQuiz } from './QuizForm';

export const useQuiz = () => {
  return useContext(QuizContext);
};

export const transformCreateQuiz = ({
  answers,
  quizId,
  quizVersionId,
}: IFormPlayQuiz): ICreateQuizCompleteInput => {
  return {
    answerIds: answers.reduce((pv: number[], cv): number[] => {
      pv = pv.concat(cv.answerIds.map((e) => +e));
      return pv;
    }, []),
    quizId,
    quizVersionId,
  };
};
