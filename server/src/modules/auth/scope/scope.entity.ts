import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActionEnum, EntityEnum } from '@common/enums';
import { RoleEntity } from '@auth/role/role.entity';

@Entity({ name: 'scopes' })
export class ScopeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: ActionEnum })
  action: ActionEnum;

  @Column({ type: 'enum', enum: EntityEnum })
  entity: EntityEnum;

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: EntityEnum.ROLE_SCOPE })
  roles: RoleEntity[];
}
