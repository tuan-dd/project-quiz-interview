import { UserEntity } from '@user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityEnum } from '@common/enums';
import { ScopeEntity } from '@auth/scope/scope.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToMany(() => ScopeEntity)
  @JoinTable({ name: EntityEnum.ROLE_SCOPE })
  scopes: ScopeEntity[];

  @OneToMany(() => UserEntity, (r) => r.role)
  users: UserEntity[];
}
