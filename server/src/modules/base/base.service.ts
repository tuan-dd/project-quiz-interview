import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindOptionsWhere,
  DataSource,
  QueryRunner,
  SelectQueryBuilder,
  DeepPartial,
} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  HttpStatus,
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { PageResponseDto } from '../../common/dto/PageResponseDto';
import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import { ERROR_MSG } from '@common/constants/error-code';
import { ErrorCode } from '@common/enums';

@Injectable()
export abstract class BaseService<E> {
  constructor(public readonly repository: Repository<E>) {
    this.entityName = this.repository.metadata.name;
  }
  public readonly entityName: string;

  @InjectDataSource()
  public readonly dataSource: DataSource;

  async startTransaction(): Promise<QueryRunner> {
    try {
      // Open a new transaction
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.startTransaction();
      return queryRunner;
    } catch (err: any) {
      // console.log('\n ==> ERR =', err.message);
      throw new BadRequestException(err);
    }
  }

  async handleTransactionAndRelease(
    queryRunner: QueryRunner,
    callback: () => Promise<void>,
    callError?: (error: any) => Promise<void>,
  ): Promise<void> {
    try {
      // Run callback function
      await callback();

      // Commit transaction
      await queryRunner.commitTransaction();

      // Rollback
    } catch (error) {
      await queryRunner.rollbackTransaction();

      callError && callError(error);
      throw new InternalServerErrorException(ERROR_MSG[ErrorCode.UNEXPECTED_ERROR]);

      // Release the query runner
    } finally {
      await queryRunner.release();
    }
  }

  async checkExist(condition: FindOptionsWhere<E> | FindOneOptions<E>): Promise<E> {
    const existRecord = Object.keys(condition).includes('where')
      ? await this.repository.findOne(condition)
      : await this.repository.findOneBy(condition as FindOptionsWhere<E>);
    if (!existRecord)
      throw new NotFoundException({
        message: `[${this.repository.metadata.name}] Not found`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    return existRecord;
  }

  createBaseQueryBuilder(payload: PageOptionsDto): SelectQueryBuilder<E> {
    const { isDeleted, ids } = payload;

    const queryBuilder = this.repository.createQueryBuilder(this.entityName);

    // Query by list ids
    if (ids?.length) {
      queryBuilder.whereInIds(ids);
    }

    // Query deleted records
    if (isDeleted)
      queryBuilder.andWhere(`${this.entityName}.deleted_at IS NOT NULL`).withDeleted();
    return queryBuilder;
  }

  async getEntitiesByQuery(
    payload: PageOptionsDto,
    callback: () => SelectQueryBuilder<E>,
  ): Promise<PageResponseDto<E>> {
    const { order, selectAll, skip, take, orderField } = payload;

    const queryBuilder = callback();

    queryBuilder.addOrderBy(`${this.entityName}.${orderField || 'createdAt'}`, order);

    if (!selectAll) queryBuilder.take(take).skip(skip);
    const [entities, count] = await queryBuilder.getManyAndCount();

    return new PageResponseDto({
      pageOptionsDto: payload,
      itemCount: count,
      data: entities,
    });
  }

  /**
   * Finds first entity that matches given conditions
   * @param condition A condition object
   *
   * Ex:
   * { where: { name: 'Peter' } }
   *
   * @returns An entity object
   */
  async findOne(condition: FindOneOptions<E>): Promise<E> {
    return this.repository.findOne(condition);
  }

  /**
   * Finds entities that match given conditions.
   * @param condition A condition object
   *
   * Ex:
   * { where: { name: 'Peter' } }
   *
   * @returns A list of entities
   */
  async getAll(condition: FindManyOptions<E>): Promise<E[]> {
    return this.repository.find(condition);
  }

  /**
   * Insert data to DB.
   * @param Insert entity to Db if exist It will save to db
   *
   *
   * @returns An entity object
   */
  store(data: DeepPartial<E>): Promise<E> {
    return this.repository.save(data);
  }

  /**
   * Insert data to DB.
   * @param Insert array of entities  to Db if exist It will save to db
   *
   *
   * @returns An entity object
   */
  stores(data: DeepPartial<E>[]): Promise<E[]> {
    return this.repository.save(data);
  }

  createTemplate(data: DeepPartial<E>): E {
    return this.repository.create(data);
  }

  createTemplates(data: DeepPartial<E>[]): E[] {
    return this.repository.create(data);
  }
}
