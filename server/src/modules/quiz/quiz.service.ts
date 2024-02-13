import { BaseService } from '@base/base.service';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { QuizEntity } from './quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@user/user.service';
import { Repository, Brackets, In } from 'typeorm';
import { ERROR_MSG } from '@common/constants/error-code';
import { DateFormat, ErrorCode, RoleType } from '@common/enums';
import { getDateFormat, stringifyAnObject } from '@common/utils';
import { SelectAnswerInput } from './dto/SelectAnswerInput.dto';
import { QuestionService } from './question/question.service';
import { CreateQuizCompleteInput } from './dto/CreateQuizComplete.dto';
import { UserQuizEntity } from './user_quiz/user-quiz.entity';
import { ContextService } from '@providers/context.service';
import { GeneralLogger } from '@shared/services/logger-general.service';
import { EQuizStatus } from './enum/quiz-status.enum';

@Injectable()
export class QuizService extends BaseService<QuizEntity> {
  constructor(
    @InjectRepository(QuizEntity)
    private _repo: Repository<QuizEntity>,
    @InjectRepository(UserQuizEntity)
    private _userQuizRepo: Repository<UserQuizEntity>,
    private userService: UserService,
    private questionService: QuestionService,
    private _generalLogger: GeneralLogger,
  ) {
    super(_repo);
  }

  async getQuizUser(name: string): Promise<QuizEntity> {
    const userId = ContextService.getAuthUser();
    const quiz = await this.repository
      .createQueryBuilder('quiz')
      .innerJoinAndSelect('quiz.selectedVersion', 'selectedVersion')
      .innerJoinAndSelect('selectedVersion.versionQuestion', 'versionQuestion')
      .innerJoinAndSelect('versionQuestion.question', 'question')
      .innerJoinAndSelect('question.options', 'options')
      .where(`quiz.name = :name`)
      .andWhere('quiz.status = :status')
      .andWhere(
        new Brackets((qb) =>
          qb.where(`quiz.expireAt IS NULL`).orWhere(`quiz.expireAt > :expireAt`),
        ),

        {
          expireAt: getDateFormat({ format: DateFormat.FULL_DATE_TIME }),
          name,
          status: EQuizStatus.ACTIVE,
        },
      )
      .orderBy('options.order', 'ASC')
      .orderBy('versionQuestion.order', 'ASC')
      .getOne();

    if (!quiz) {
      throw new NotFoundException(ERROR_MSG[ErrorCode.NOT_FOUND_QUIZ]);
    }

    const isPlayed = await this._userQuizRepo.findOne({
      where: { quizVersionId: quiz.selectedVersionId, userId },
      relations: { quizVersion: true },
    });

    if (isPlayed) {
      throw new BadRequestException(ERROR_MSG[ErrorCode.USER_PLAYED_QUIZ]);
    }

    return quiz;
  }

  async createQuizComplete({
    answerIds,
    quizId,
    quizVersionId,
  }: CreateQuizCompleteInput): Promise<HttpStatus> {
    const userId = ContextService.getAuthUser();
    const roleId = ContextService.getRoleId();

    if (roleId !== RoleType.NORMAL_USER) {
      throw new UnauthorizedException(ERROR_MSG[ErrorCode.UNAUTHORIZED_PLAY_QUIZ]);
    }

    const isPlayed = await this._userQuizRepo.findOne({
      where: { quizVersionId, userId },
    });

    if (isPlayed) {
      throw new BadRequestException(ERROR_MSG[ErrorCode.USER_PLAYED_QUIZ]);
    }

    const quiz = await this.repository
      .createQueryBuilder('quiz')
      .innerJoinAndSelect('quiz.selectedVersion', 'selectedVersion')
      .innerJoinAndSelect('selectedVersion.versionQuestion', 'versionQuestion')
      .innerJoinAndSelect('versionQuestion.question', 'question')
      .innerJoinAndSelect('question.options', 'options')
      .where(`quiz.id = :quizId`)
      .andWhere(`quiz.selectedVersionId = :quizVersionId`)
      .andWhere(`options.isCorrect IS TRUE`)
      .andWhere('quiz.status = :status')
      .andWhere(
        new Brackets((qb) =>
          qb.where(`quiz.expireAt IS NULL`).orWhere(`quiz.expireAt > :expireAt`),
        ),
        {
          expireAt: getDateFormat({ format: DateFormat.FULL_DATE_TIME }),
          quizId,
          quizVersionId,
          status: EQuizStatus.ACTIVE,
        },
      )

      .getOne();

    if (!quiz) {
      throw new NotFoundException(ERROR_MSG[ErrorCode.NOT_FOUND_QUIZ]);
    }

    /**
     * check all answer is correct and choose ony correct answer
     */

    const objectAnswerIds = answerIds.reduce((pv: Record<number, true>, cv) => {
      pv[cv] = true;
      return pv;
    }, {});

    let numberAnswer = 0;

    quiz.selectedVersion.versionQuestion.forEach((e) => {
      e.question.options.forEach(({ id }) => {
        if (!objectAnswerIds[+id]) {
          throw new BadRequestException(ERROR_MSG[ErrorCode.INCORRECT_ANSWER]);
        }
      });

      numberAnswer += e.question.options.length;
    });

    if (answerIds.length !== numberAnswer) {
      throw new BadRequestException(ERROR_MSG[ErrorCode.INCORRECT_ANSWER]);
    }

    /**
     * update coin for user by transaction
     */
    const queryRunner = await this.startTransaction();

    await this.handleTransactionAndRelease(
      queryRunner,
      async () => {
        const { manager } = queryRunner;

        await manager.save(UserQuizEntity, { userId, quizVersionId });

        await this.userService.updateCoinUser(
          manager,
          +quiz.selectedVersion.reward,
          userId,
        );
      },
      async (error) => this._generalLogger.log(stringifyAnObject(error)),
    );

    return HttpStatus.OK;
  }

  async checkAnswerUser({
    answerIds,
    questionId,
  }: SelectAnswerInput): Promise<HttpStatus> {
    const question = await this.questionService.findOne({
      where: {
        id: +questionId,
        options: {
          isCorrect: true,
        },
      },
      select: {
        id: true,
        options: { id: true, isCorrect: true },
      },
      relations: { options: true },
    });

    if (question.options.length !== answerIds.length) {
      throw new BadRequestException(ERROR_MSG[ErrorCode.INCORRECT_ANSWER]);
    }

    if (!question.options.every((e) => answerIds.includes(e.id))) {
      throw new BadRequestException(ERROR_MSG[ErrorCode.INCORRECT_ANSWER]);
    }

    return HttpStatus.OK;
  }

  async getInFoQuizUserPlayed(quizVersionId: string) {
    const userId = ContextService.getAuthUser();
    const quizVersion = await this._userQuizRepo.findOne({
      where: { quizVersionId, userId },
      relations: { quizVersion: true },
    });

    if (!quizVersion) {
      throw new NotFoundException(ERROR_MSG[ErrorCode.NOT_FOUND_QUIZ]);
    }

    return quizVersion;
  }
}
