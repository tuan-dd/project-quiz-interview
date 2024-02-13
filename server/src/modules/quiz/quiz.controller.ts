import { RolesGuard } from '@guards/roles.guard';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizCompleteInput } from './dto/CreateQuizComplete.dto';
import { SelectAnswerInput } from './dto/SelectAnswerInput.dto';

import { QuizEntity } from './quiz.entity';
import { UserQuizEntity } from './user_quiz/user-quiz.entity';

@Controller('quiz')
@UseGuards(RolesGuard)
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/:name')
  async getQuiz(@Param('name') name: string): Promise<QuizEntity> {
    return this.quizService.getQuizUser(name);
  }

  @Post('checkAnswer')
  async checkAnswerCorrect(@Body() payLoad: SelectAnswerInput): Promise<HttpStatus> {
    return this.quizService.checkAnswerUser(payLoad);
  }

  @Post('create-quiz-complete')
  async createQuizComplete(
    @Body() payLoad: CreateQuizCompleteInput,
  ): Promise<HttpStatus> {
    return this.quizService.createQuizComplete(payLoad);
  }

  @Get('quiz-user-played/:quizId')
  async getInFoQuizUserPlayed(@Param('quizId') quizId: string): Promise<UserQuizEntity> {
    return this.quizService.getInFoQuizUserPlayed(quizId);
  }
}
