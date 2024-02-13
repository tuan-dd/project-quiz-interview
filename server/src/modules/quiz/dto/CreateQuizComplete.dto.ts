import { ArrayMinSize, IsArray, IsPositive, IsUUID } from 'class-validator';

export class CreateQuizCompleteInput {
  @IsUUID()
  quizId: string;

  @IsUUID()
  quizVersionId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsPositive({ each: true })
  answerIds: number[];
}
