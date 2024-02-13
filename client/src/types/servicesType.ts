import { EntityEnum } from './enums/Entity';
import { ActionEnum } from './enums/action';
import { EQuizStatus } from './enums/quizStatus';
import { ETypeQuestions } from './enums/typeQuestions';

export interface ISelectAnswerInput {
  questionId: number;
  answerIds: number[];
}

export interface ICreateQuizCompleteInput {
  answerIds: number[];
  quizId: string;
  quizVersionId: string;
}

export interface IQuizRecord {
  id: string;
  name: string;
  expireAt: Date | string;
  status: EQuizStatus;
  selectedVersionId?: string;
  selectedVersion?: IQuizVersionRecord;
  createdById: string;
}

export interface IQuizVersionRecord {
  id: string;
  reward: number;
  description: string;
  versionNumber: number;
  createdById: string;
  quizId: string;
  versionQuestion: VersionQuestionRecord[];
}

export interface VersionQuestionRecord {
  questionId: number;
  versionId: string;
  order: number;
  question: IQuestionRecord;
}

export interface IQuestionRecord {
  id: number;
  type: ETypeQuestions;
  title: string;
  hint: string;
  options: IOptionRecord[];
}

export interface IOptionRecord {
  id: number;
  text: string;
  order: number;
  questionId: string;
}

export interface IUserRecord {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  roleId: string;
  role?: IRoleRecord;
  info?: IInfoUserRecord;
}

export interface IRoleRecord {
  name: string;
  id: number;
  scopes: IScopeRecord[];
}
export interface IInfoUserRecord {
  id: number;
  userId: string;
  coin: number;
}

export interface IScopeRecord {
  action: ActionEnum;
  entity: EntityEnum;
}

export interface ISignInRes {
  AccessToken: string;

  ExpiresIn: number;

  RefreshToken: string;
}

export interface IReTakeTokenRes {
  AccessToken: string;

  ExpiresIn: number;
}

export interface IUserRegister {
  firstName: string;

  lastName: string;

  phone: string;

  password: string;

  avatar?: string;

  phonePrefix?: string;
}

export interface IUserQuizRecord {
  userId: string;
  quizVersionId: string;
  quizVersion: IQuizVersionRecord;
}
