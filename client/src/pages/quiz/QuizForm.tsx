import {
  ICreateQuizCompleteInput,
  IQuestionRecord,
  ISelectAnswerInput,
} from '@/types/servicesType';
import { Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';
import Question from './Question';
import { FormProvider, useForm } from 'react-hook-form';
import { CREATE_QUIZ_VALIDATION } from '@/modules/validate/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import BasicStart from './BasicStart';
import { useNavigate } from 'react-router-dom';
import Empty from '@/modules/components/Empty/Empty';
import { transformCreateQuiz, useQuiz } from './quizHook';
import QuizService from '@/services/quiz.service';

interface IAnswers extends Partial<IQuestionRecord> {
  answerIds: number[];
  id: number;
}

export interface IFormPlayQuiz extends Omit<ICreateQuizCompleteInput, 'answerIds'> {
  answers: IAnswers[];
}

const formValues: IFormPlayQuiz = {
  answers: [],
  quizId: '',
  quizVersionId: '',
};

function QuizForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { quiz, dispatch, isStart, isComplete, error, orderQuestion, countQuestion } = useQuiz();

  // const validation = useMemo(
  //   () =>
  //     isStart && !isComplete
  //       ? CREATE_QUIZ_VALIDATION.selectAnswer
  //       : CREATE_QUIZ_VALIDATION.submitQuiz,
  //   [isStart, isComplete],
  // );

  const methods = useForm<IFormPlayQuiz>({
    defaultValues: formValues,
    mode: 'onSubmit',
    resolver: yupResolver(CREATE_QUIZ_VALIDATION.selectAnswer),
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

  console.log(watch());

  const useCreateQuiz = useMutation({
    mutationFn: (payload: ICreateQuizCompleteInput) => QuizService.createQuizComplete(payload),
    onSuccess: () => {
      navigate(`quiz-success/${quiz?.selectedVersionId}`);
      queryClient.invalidateQueries({ queryKey: ['getMe'] });
    },
    onError: () => {
      dispatch({ error: { message: 'Wrong answer', type: 'checkAnswerCorrect' } });
    },
  });

  const useCheckAnswer = useMutation({
    mutationFn: (payload: ISelectAnswerInput) => QuizService.checkAnswerCorrect(payload),
    onSuccess: async () => {
      if (orderQuestion !== countQuestion) {
        return dispatch({
          orderQuestion: orderQuestion + 1,
        });
      }
      const data = watch();

      useCreateQuiz.mutate(transformCreateQuiz(data));
    },
    onError: () => {
      console.log('run');

      dispatch({ error: { type: 'checkAnswerCorrect', message: 'Wrong answer' } });
    },
  });

  const onSubmit = async (data: IFormPlayQuiz) => {
    try {
      const newAnswer = data.answers[orderQuestion - 1];

      if (orderQuestion === countQuestion) {
        await CREATE_QUIZ_VALIDATION.submitQuiz.validate(data, {
          stripUnknown: false,
        });
      }

      if (newAnswer)
        useCheckAnswer.mutate({
          answerIds: newAnswer?.answerIds as number[],
          questionId: newAnswer.id,
        });

      return;
    } catch (error) {
      dispatch({
        error: { type: 'notAnswerAllQuestion', message: 'You must answer all questions' },
      });
    }
  };

  useEffect(() => {
    if (quiz && quiz.selectedVersion?.versionQuestion) {
      reset({
        quizId: quiz.id,
        quizVersionId: quiz.selectedVersionId,
        answers: quiz.selectedVersion.versionQuestion.map((e) => ({
          ...e.question,
          answerIds: [],
        })),
      });
    }
  }, [quiz]);

  return (
    <>
      {/* <SpinComponent spinning={isLoading} /> */}

      <Stack justifyContent={'center'} alignItems={'center'}>
        {error?.type === 'notFoundQuiz' && <Empty message={error.message} />}
        {error?.type === 'notAnswerAllQuestion' && (
          <Typography color={'Highlight'}>{error.message}</Typography>
        )}
        <FormProvider {...methods}>
          <Stack alignItems={'center'} gap={'1.25rem'}>
            {quiz && (
              <>
                {isStart ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack justifyContent={'center'} alignItems={'center'} gap={'0.5rem'}>
                      <Question questionIndex={orderQuestion - 1} />
                      <Button
                        className="max-w-[250px]  w-full block mx-auto"
                        type={'submit'}
                        variant={'contained'}
                      >
                        Next
                      </Button>
                    </Stack>
                  </form>
                ) : (
                  <BasicStart />
                )}
              </>
            )}
          </Stack>
        </FormProvider>
      </Stack>
    </>
  );
}

export default QuizForm;
