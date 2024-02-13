import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { InfoUserEntity } from './info_user/info-user.entity';
import { InfoLatestSigninEntity } from './info_latest_signin/info-latest-signin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, InfoUserEntity, InfoLatestSigninEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
