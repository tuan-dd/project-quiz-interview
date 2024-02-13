import { AbstractEntity } from '@common/abstract.entity';
import { QuizVersionEntity } from '@quiz/version_quiz/quiz-version.entity';
import { UserEntity } from '@user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';

@Entity('user_quiz')
export class UserQuizEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (e) => e.playedQuiz)
  user: Relation<UserEntity>;

  @Column()
  quizVersionId: string;

  @ManyToOne(() => QuizVersionEntity, (e) => e.players)
  quizVersion: Relation<QuizVersionEntity>;
}
