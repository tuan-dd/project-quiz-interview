/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AbstractDto } from './dto/AbstractDto';
import { Exclude } from 'class-transformer';

export class AbstractEntity<_T extends AbstractDto = AbstractDto> extends BaseEntity {
  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({
    type: 'timestamp without time zone',
    nullable: true,
  })
  deletedAt: Date;
}
