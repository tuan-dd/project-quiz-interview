import { AbstractEntity } from '@common/abstract.entity';
import { UserEntity } from '@user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { QuizVersionEntity } from './version_quiz/quiz-version.entity';
import { EQuizStatus } from './enum/quiz-status.enum';

@Entity('quiz')
export class QuizEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'timestamptz', nullable: true })
  expireAt: Date | string;

  @Column({ type: 'enum', enum: EQuizStatus })
  status: EQuizStatus;

  @Column({ nullable: true })
  selectedVersionId?: string;

  @OneToOne(() => QuizVersionEntity, { nullable: true })
  @JoinColumn({ name: 'selected_version_id' })
  selectedVersion?: Relation<QuizVersionEntity>;

  @Column()
  createdById: string;

  @ManyToOne(() => UserEntity, (e) => e.quiz)
  @JoinColumn({ name: 'created_by_id' })
  createdByUser: Relation<UserEntity>;

  @OneToMany(() => QuizVersionEntity, (e) => e.quiz)
  versions: QuizVersionEntity[];
}
