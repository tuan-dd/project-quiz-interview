import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import { BaseService } from '@base/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService extends BaseService<QuestionEntity> {
  constructor(
    @InjectRepository(QuestionEntity) private _repo: Repository<QuestionEntity>,
  ) {
    super(_repo);
  }
}
