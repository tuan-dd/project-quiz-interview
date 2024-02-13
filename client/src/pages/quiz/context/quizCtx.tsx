import SpinComponent from '@/modules/components/SpinComponent/SpinComponent';
import QuizService from '@/services/quiz.service';
import { IQuizRecord } from '@/types/servicesType';
import { useQuery } from '@tanstack/react-query';
import React, { ReactNode, useEffect, useReducer, createContext } from 'react';

type TErrorQuiz = 'checkAnswerCorrect' | 'notFoundQuiz' | 'notAnswerAllQuestion';

interface IQuizContext {
  orderQuestion: number;
  isStart: boolean;
  countQuestion: number;
  quiz?: IQuizRecord;
  isComplete: boolean;
  error?: {
    type: TErrorQuiz;
    message: string;
  };
}

const instalState: IQuizContext = {
  orderQuestion: 0,
  countQuestion: 0,
  isStart: false,
  isComplete: false,
};

export const QuizContext = createContext<
  IQuizContext & { dispatch: React.Dispatch<Partial<IQuizContext>> }
>({
  ...instalState,
  dispatch: (_data: Partial<IQuizContext>) => {},
});

export const QuizProvider = (props: { children: ReactNode }) => {
  const name = import.meta.env.VITE_APP_QUIZ_NAME;
  const [state, dispatch] = useReducer(
    (pr: IQuizContext, action: Partial<IQuizContext>): IQuizContext => {
      return {
        ...pr,
        error: undefined,
        ...action,
      };
    },
    instalState,
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['getQuizUser', name],
    queryFn: () => QuizService.getQuizUser(name),
    retry: 0,
  });

  useEffect(() => {
    if (data?.data.selectedVersion?.versionQuestion.length) {
      dispatch({
        countQuestion: data?.data.selectedVersion?.versionQuestion.length,
        quiz: data.data,
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      dispatch({
        ...instalState,
        error: {
          message: (error as any)?.response?.data?.message || 'Not found quiz',
          type: 'notFoundQuiz',
        },
      });
    }
  }, [error]);

  return (
    <QuizContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {props.children}
      <SpinComponent spinning={isLoading} />
    </QuizContext.Provider>
  );
};
