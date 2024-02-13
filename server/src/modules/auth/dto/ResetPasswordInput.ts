import { IsString } from 'class-validator';

export class ResetPasswordInput {
  @IsString()
  number: string;

  @IsString()
  password: string;

  @IsString()
  code: string;
}
