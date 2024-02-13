import { AbstractEntity } from '../abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'typeorm';

export abstract class AbstractDto extends BaseEntity {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(entity: AbstractEntity) {
    super();
    this.createdAt = entity?.createdAt;
    this.updatedAt = entity?.updatedAt;
    this.deletedAt = entity?.deletedAt;
  }
}
