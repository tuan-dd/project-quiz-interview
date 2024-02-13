import { UserEntity } from '@user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';

@Entity('info_latest_signin')
export class InfoLatestSigninEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  ipAddress?: string;

  @Column({ type: 'timestamptz', nullable: true })
  time?: Date;

  @Column()
  userId: string;

  @Column({ nullable: true })
  location: string;

  @OneToOne(() => UserEntity, (e) => e.infoSignIn)
  @JoinColumn({
    name: 'user_id',
  })
  user: Relation<UserEntity>;
}
