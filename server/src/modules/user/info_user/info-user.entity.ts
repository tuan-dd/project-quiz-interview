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

@Entity('info_user')
export class InfoUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'float4' })
  coin: number;

  @Column()
  userId: string;

  @OneToOne(() => UserEntity, (e) => e.info)
  @JoinColumn({
    name: 'user_id',
  })
  user: Relation<UserEntity>;
}
