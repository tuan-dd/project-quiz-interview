import { ControlledInput } from '@/modules/common/inputs';
import { INPUT_TYPES } from '@/modules/common/inputs/input.types';
import { IOptionRecord } from '@/types/servicesType';
import { useQuiz } from './quizHook';
import { useFormContext } from 'react-hook-form';
import { IFormPlayQuiz } from './QuizForm';
import { ETypeQuestions } from '@/types/enums/typeQuestions';
import { IconButton, Stack, Typography } from '@mui/material';
import { ArrowIcon, ArrowLeftIcon } from '@/icons';

function Question({ questionIndex }: { questionIndex: number }) {
  const { getValues, setValue } = useFormContext<IFormPlayQuiz>();

  const { dispatch, orderQuestion, countQuestion, error } = useQuiz();
  const question = getValues('answers')[questionIndex];
  const options = (question.options as IOptionRecord[])?.map((e) => ({
    value: e.id.toString(),
    label: e.text,
  }));
  const isTypeMultiple = question.type === ETypeQuestions.MULTIPLE_CHOICE;

  const onChance = (value: any) => {
    const values = getValues(`answers.${questionIndex}.answerIds`);

    if (!values || !isTypeMultiple) {
      return setValue(`answers.${questionIndex}.answerIds`, [value]);
    }

    setValue(`answers.${questionIndex}.answerIds`, value);
  };

  const isFirstQuestion = orderQuestion === 1;
  const isLastQuestion = orderQuestion === countQuestion;

  const handleClickNextQuestion = (isNextQuestion: boolean) => {
    dispatch({ orderQuestion: isNextQuestion ? orderQuestion + 1 : orderQuestion - 1 });
  };

  return (
    <>
      <Stack direction={'row'} gap={2}>
        <IconButton onClick={() => handleClickNextQuestion(false)} disabled={isFirstQuestion}>
          <ArrowLeftIcon className="w-3 h-4" />
        </IconButton>
        <IconButton onClick={() => handleClickNextQuestion(true)} disabled={isLastQuestion}>
          <ArrowIcon className="w-3 h-4" />
        </IconButton>
      </Stack>
      <h3 className="dark:text-white mb-5"> {question.title}</h3>
      {isTypeMultiple ? (
        <ControlledInput
          inputType={INPUT_TYPES.GROUP_CHECK_BOX}
          name={`answers.${questionIndex}.answerIds`}
          options={options || []}
          onChange={onChance}
        />
      ) : (
        <ControlledInput
          inputType={INPUT_TYPES.RADIO_BUTTON}
          name={`answers.${questionIndex}.answerIds`}
          options={options || []}
          onChange={onChance}
        />
      )}
      {error?.type === 'checkAnswerCorrect' && (
        <Typography color="Highlight">{question.hint}</Typography>
      )}
    </>
  );
}

export default Question;
