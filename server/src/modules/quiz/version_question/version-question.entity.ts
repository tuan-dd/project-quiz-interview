import { EntityEnum } from '@common/enums';
import { QuestionEntity } from '@quiz/question/question.entity';
import { QuizVersionEntity } from '@quiz/version_quiz/quiz-version.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from 'typeorm';

@Entity(EntityEnum.VERSION_QUESTION)
export class VersionQuestionEntity {
  @PrimaryColumn()
  versionId: string;

  @PrimaryColumn()
  questionId: number;

  @ManyToOne(() => QuizVersionEntity, (e) => e.versionQuestion)
  @JoinColumn({ name: 'version_id' })
  version: Relation<QuizVersionEntity>;

  @ManyToOne(() => QuestionEntity, (e) => e.versionQuestion)
  @JoinColumn({ name: 'question_id' })
  question: Relation<QuestionEntity>;

  @Column({ type: 'int' })
  order: number;
}
