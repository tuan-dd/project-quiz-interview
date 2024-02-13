import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { AbstractEntity } from '@common/abstract.entity';
import { RoleEntity } from '@auth/role/role.entity';
import { UtilsService } from '@providers/utils.service';
import { InfoUserEntity } from './info_user/info-user.entity';
import { InfoLatestSigninEntity } from './info_latest_signin/info-latest-signin.entity';
import { QuizVersionEntity } from '@quiz/version_quiz/quiz-version.entity';
import { QuizEntity } from '@quiz/quiz.entity';
import { UserQuizEntity } from '@quiz/user_quiz/user-quiz.entity';
import { Expose } from 'class-transformer';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  firstName: string;

  @Column({ length: 200 })
  lastName: string;

  @Column({ type: 'text', unique: true })
  phone: string;

  @Column({ select: false })
  password: string;

  @Column()
  roleId: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!!this.password) {
      this.password = UtilsService.generateHash(this.password);
    }

    if (!!this.phone) {
      this.phone = UtilsService.encryptData(this.phone);
    }
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @ManyToOne(() => RoleEntity, (r) => r.users)
  role: RoleEntity;

  @OneToOne(() => InfoUserEntity, (e) => e.user)
  info: InfoUserEntity;

  @OneToOne(() => InfoLatestSigninEntity, (e) => e.user)
  infoSignIn: InfoUserEntity;

  @OneToMany(() => QuizVersionEntity, (e) => e.createdByUser, { nullable: true })
  quizVersions: QuizVersionEntity[];

  @OneToMany(() => QuizEntity, (e) => e.createdByUser, { nullable: true })
  quiz: QuizEntity[];

  @OneToMany(() => UserQuizEntity, (e) => e.user, { nullable: true })
  playedQuiz: UserQuizEntity[];
}
