import { Exclude, Type } from 'class-transformer';
import { IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';

export class ResponseQuizUser {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => ResponseSelectedVersionUser)
  selectedVersion: ResponseSelectedVersionUser;
}

export class ResponseSelectedVersionUser {
  @IsUUID()
  id: string;

  @IsNumber()
  reward: number;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => ResponseQuestionUser)
  questions: ResponseQuestionUser[];
}

class ResponseQuestionUser {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  hint: string;

  @ValidateNested()
  @Type(() => ResponseOption)
  options: ResponseOption[];
}

class ResponseOption {
  @IsNumber()
  id: number;

  @IsString()
  text: string;

  @Exclude()
  isCorrect: boolean;
}
