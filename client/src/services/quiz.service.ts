import { ICreateQuizCompleteInput, IQuizRecord, ISelectAnswerInput } from '../types/servicesType';
import APIService from './base.service';
import { AxiosResponse, HttpStatusCode } from 'axios';
// import { IEndUserBusinessSignUpDto, IEndUserPersonalSignUpDto } from '@/type';

export default class QuizService {
  static getQuizUser(name: string): Promise<AxiosResponse<IQuizRecord>> {
    return APIService.get(`/quiz/${name}`);
  }
  static checkAnswerCorrect(payload: ISelectAnswerInput): Promise<AxiosResponse<HttpStatusCode>> {
    return APIService.post('/quiz/checkAnswer', payload);
  }
  static createQuizComplete(
    payload: ICreateQuizCompleteInput,
  ): Promise<AxiosResponse<HttpStatusCode>> {
    return APIService.post('/quiz/create-quiz-complete', payload);
  }
  static getInfoQuizPlayed(id: string): Promise<AxiosResponse<HttpStatusCode>> {
    return APIService.get(`/quiz/quiz-user-played/${id}`);
  }
}
