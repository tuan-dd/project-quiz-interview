import QuizService from '@/services/quiz.service';
import { LoaderFunctionArgs } from 'react-router-dom';

export async function loaderQuiz({ params, request }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) throw new Error('Expected params.id');

  try {
    const response = await QuizService.getInfoQuizPlayed(id);

    return response.data;
  } catch (error) {
    // throw  new error;
    return error;
  }
}
