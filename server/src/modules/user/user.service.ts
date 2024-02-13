import { BaseService } from '@base/base.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoUserEntity } from './info_user/info-user.entity';
import { InfoLatestSigninEntity } from './info_latest_signin/info-latest-signin.entity';
import { GeneralLogger } from '@shared/services/logger-general.service';
import { ContextService } from '@providers/context.service';
import { getDateFormat } from '@common/utils';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private _repo: Repository<UserEntity>,
    @InjectRepository(InfoUserEntity)
    private _infoRepo: Repository<InfoUserEntity>,
    @InjectRepository(InfoLatestSigninEntity)
    private _infoSignInRepo: Repository<InfoLatestSigninEntity>,
    private _generalLogger: GeneralLogger,
  ) {
    super(_repo);
  }

  override async store(data: DeepPartial<UserEntity>): Promise<UserEntity> {
    const queryRunner = await this.startTransaction();

    let userCreate;
    await this.handleTransactionAndRelease(
      queryRunner,
      async () => {
        const { manager } = queryRunner;
        const userCreate = await manager.save(UserEntity, data);

        await manager.insert(InfoUserEntity, {
          coin: 0,
          userId: userCreate.id,
        });

        await manager.insert(InfoLatestSigninEntity, {
          userId: userCreate.id,
        });
      },
      async (error) => this._generalLogger.error(error),
    );

    return userCreate;
  }

  override async stores(data: DeepPartial<UserEntity>[]): Promise<UserEntity[]> {
    const queryRunner = await this.startTransaction();

    let usersCreate;

    await this.handleTransactionAndRelease(
      queryRunner,
      async () => {
        const { manager } = queryRunner;
        usersCreate = await manager.save(UserEntity, data);

        const infoUsers = [];
        const infoSignIn = [];

        data.forEach((e) => {
          infoUsers.push({
            coin: 0,
            userId: e.id,
          });
          infoSignIn.push({
            userId: e.id,
          });
        });

        await manager.insert(InfoUserEntity, infoUsers);

        await manager.insert(InfoLatestSigninEntity, infoSignIn);
      },

      async (error) => this._generalLogger.error(error),
    );

    return usersCreate;
  }

  async updateLatestTimeSignIn(userId: string) {
    const infoRequest = ContextService.getRequestInfo();
    return this._infoSignInRepo.update(
      { userId },
      {
        location: infoRequest?.location,
        ipAddress: infoRequest?.ipAddress,
        time: getDateFormat({}),
      },
    );
  }

  async updateCoinUser(manager: EntityManager, coin: number, userId: string) {
    return manager.increment(InfoUserEntity, { userId }, 'coin', coin);
  }
}
