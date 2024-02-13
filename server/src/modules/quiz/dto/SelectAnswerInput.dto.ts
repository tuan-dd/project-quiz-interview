import { ArrayMinSize, IsArray, IsNumberString, IsPositive } from 'class-validator';

export class SelectAnswerInput {
  @IsPositive()
  questionId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsPositive({ each: true })
  answerIds: number[];
}
