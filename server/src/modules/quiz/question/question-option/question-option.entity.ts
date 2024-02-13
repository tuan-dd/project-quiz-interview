import { AbstractEntity } from '@common/abstract.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { QuestionEntity } from '@quiz/question/question.entity';
import { Exclude } from 'class-transformer';

@Entity('question_options')
export class QuestionOptionEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  text: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'boolean' })
  isCorrect: boolean;

  @Column()
  order: number;

  @Column()
  questionId: string;

  @ManyToOne(() => QuestionEntity, (e) => e.options)
  question: Relation<QuestionEntity>;
}
