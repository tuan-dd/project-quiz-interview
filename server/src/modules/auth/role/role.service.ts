import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidatorService } from '../../../shared/services/validator.service';
import { BaseService } from '../../base/base.service';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    public readonly roleRepository: Repository<RoleEntity>,
    public readonly validatorService: ValidatorService,
  ) {
    super(roleRepository);
  }

  async getRoleByUserId(userId: string): Promise<RoleEntity> {
    return this.repository.findOne({ userId } as FindOneOptions<unknown>);
  }

  async getAllRole(): Promise<RoleEntity[]> {
    return this.repository.find();
  }
}
