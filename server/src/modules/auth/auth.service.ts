import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IPayLoadUser } from '@common/interfaces/payload-user.interface';
import { ConfigService } from '@shared/services/config.service';

import {
  UserLoginDto,
  UserRetakeTokenDto,
  UserTokenResponseDto,
} from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { ErrorCode, RoleType } from '@common/enums';
import { UtilsService } from '@providers/utils.service';
import { UserEntity } from '@user/user.entity';
import { ERROR_MSG } from '@common/constants/error-code';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private configServer: ConfigService,
  ) {}

  async signIn({ password, phone }: UserLoginDto): Promise<UserEntity> {
    // find the user by phone

    const enDecrypt = UtilsService.encryptData(phone);
    const user = await this.userService.findOne({
      where: { phone: enDecrypt },
      select: ['password', 'roleId', 'id'],
    });

    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException(ERROR_MSG[ErrorCode.NOT_FOUND_USER]);
    }

    // compare password
    const pwMatches = await UtilsService.validateHash(password, user.password);
    // if password incorrect throw exception
    if (!pwMatches) {
      throw new UnauthorizedException(ERROR_MSG[ErrorCode.INVALID_PASSWORD]);
    }
    return user;
  }

  async createUser(user: UserRegisterDto): Promise<HttpStatus> {
    const userCreate = this.userService.createTemplate({
      ...user,
      roleId: RoleType.NORMAL_USER,
    });

    const phoneDecrypt = UtilsService.encryptData(userCreate.phone);

    const userExisted = await this.userService.findOne({
      where: { phone: phoneDecrypt },
    });

    if (userExisted) {
      throw new ForbiddenException(ERROR_MSG[ErrorCode.USER_EXISTED]);
    }

    await this.userService.store(userCreate);
    return HttpStatus.CREATED;
  }

  async getUserWithScope(userId: string): Promise<UserEntity> {
    return await this.userService.findOne({
      where: { id: userId },
      relations: ['role', 'role.scopes'],
    });
  }

  async newAccessToken(id: string): Promise<UserRetakeTokenDto> {
    const userDb = await this.userService.findOne({ where: { id } });

    if (!userDb) throw new NotFoundException('Not Found user');

    const payload: IPayLoadUser = {
      userId: userDb.id,
      roleId: userDb.roleId,
    };

    return {
      AccessToken: this.jwt.sign(payload, {
        expiresIn: this.configServer.privateConfig.jwtConfig.expirationTime,
        secret: this.configServer.privateConfig.jwtConfig.key_at,
      }),
      ExpiresIn: this.configServer.privateConfig.jwtConfig.expirationTime,
    };
  }

  /**
   * @@description store time, ip, location lastTime user sign in
   */
  createResponseSignIn(roleId: string, userId: string): UserTokenResponseDto {
    this.userService.updateLatestTimeSignIn(userId);

    return {
      AccessToken: this.jwt.sign(
        { roleId, userId },
        {
          expiresIn: this.configServer.privateConfig.jwtConfig.expirationTime,
          secret: this.configServer.privateConfig.jwtConfig.key_at,
        },
      ),
      ExpiresIn: this.configServer.privateConfig.jwtConfig.expirationTime,

      RefreshToken: this.jwt.sign(
        { roleId, userId },
        {
          expiresIn: '2d',
          secret: this.configServer.privateConfig.jwtConfig.key_rt,
        },
      ),
    };
  }
}
