import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizEntity } from './quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizVersionEntity } from './version_quiz/quiz-version.entity';
import { QuestionEntity } from './question/question.entity';
import { QuestionOptionEntity } from './question/question-option/question-option.entity';
import { UserQuizEntity } from './user_quiz/user-quiz.entity';
import { QuestionService } from './question/question.service';
import { QuestionOptionService } from './question/question-option/question-option.service';
import { VersionQuizService } from './version_quiz/version-quiz.service';
import { VersionQuizController } from './version_quiz/version-quiz.controller';
import { QuestionController } from './question/question.controller';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuizEntity,
      QuizVersionEntity,
      QuestionEntity,
      QuestionOptionEntity,
      UserQuizEntity,
    ]),
    UserModule,
  ],
  controllers: [QuizController, VersionQuizController, QuestionController],
  providers: [QuizService, QuestionService, QuestionOptionService, VersionQuizService],
})
export class QuizModule {}
