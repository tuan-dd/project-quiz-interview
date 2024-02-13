import { IReTakeTokenRes, ISignInRes, IUserRegister } from '../types/servicesType';
import APIService from './base.service';
import { AxiosResponse, HttpStatusCode } from 'axios';
// import { IEndUserBusinessSignUpDto, IEndUserPersonalSignUpDto } from '@/type';

export default class AuthService {
  static async signIn(phone: string, password: string): Promise<AxiosResponse<ISignInRes>> {
    return APIService.post('/auth/sign-in', {
      phone,
      password,
    });
  }
  static async signUp(payload: IUserRegister): Promise<AxiosResponse<HttpStatusCode>> {
    return APIService.post('/auth/sign-up', payload);
  }
  static async retakeNewToken(): Promise<AxiosResponse<IReTakeTokenRes>> {
    return APIService.post('/auth/get-new-token');
  }
}
