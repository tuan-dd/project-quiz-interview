import { AbstractEntity } from '@common/abstract.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { ETypeQuestions } from './enum/type-question.enum';
import { QuestionOptionEntity } from '@quiz/question/question-option/question-option.entity';
import { VersionQuestionEntity } from '@quiz/version_question/version-question.entity';

@Entity('questions')
export class QuestionEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ETypeQuestions })
  type: ETypeQuestions;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 200 })
  hint: string;

  @OneToMany(() => QuestionOptionEntity, (e) => e.question)
  options: QuestionOptionEntity[];

  @OneToMany(() => VersionQuestionEntity, (e) => e.question)
  versionQuestion: Relation<VersionQuestionEntity[]>;
}
