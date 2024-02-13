import { QuizEntity } from '@quiz/quiz.entity';
import { UserQuizEntity } from '@quiz/user_quiz/user-quiz.entity';
import { VersionQuestionEntity } from '@quiz/version_question/version-question.entity';
import { UserEntity } from '@user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';

@Entity('quiz_versions')
export class QuizVersionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reward: number;

  @Column({ length: 500 })
  description: string;

  @Column()
  versionNumber: number;

  @Column()
  createdById: string;

  @ManyToOne(() => UserEntity, (e) => e.quizVersions)
  @JoinColumn({ name: 'created_by_id' })
  createdByUser: Relation<UserEntity>;

  @Column()
  quizId: string;

  @ManyToOne(() => QuizEntity, (e) => e.versions)
  quiz: QuizEntity;

  @OneToMany(() => UserQuizEntity, (e) => e.quizVersion)
  players: UserQuizEntity[];

  @OneToMany(() => VersionQuestionEntity, (e) => e.version, { cascade: true })
  versionQuestion: VersionQuestionEntity[];
}
