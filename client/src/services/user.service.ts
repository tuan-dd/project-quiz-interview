import { IUserRecord } from '../types/servicesType';
import APIService from './base.service';
import { AxiosResponse } from 'axios';
// import { IEndUserBusinessSignUpDto, IEndUserPersonalSignUpDto } from '@/type';

export default class UserService {
  static getMe(): Promise<AxiosResponse<IUserRecord>> {
    return APIService.get('/user/me');
  }
}
