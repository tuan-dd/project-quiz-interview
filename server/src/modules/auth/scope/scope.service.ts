import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ScopeEntity } from './scope.entity';
import { BaseService } from '@base/base.service';

@Injectable()
export class ScopeService extends BaseService<ScopeEntity> {
  constructor(
    @InjectRepository(ScopeEntity)
    public readonly scopeRepository: Repository<ScopeEntity>,
  ) {
    super(scopeRepository);
  }
}
