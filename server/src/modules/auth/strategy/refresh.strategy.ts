import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@shared/services/config.service';
import { EKeyHeader } from '@common/enums/header.enum';
import { IPayLoadUser } from '@common/interfaces/payload-user.interface';
import { AuthService } from '@auth/auth.service';
import { ContextService } from '@providers/context.service';
import { ERROR_MSG } from '@common/constants/error-code';
import { ErrorCode } from '@common/enums';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'rf') {
  constructor(
    configServer: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(EKeyHeader.REFRESH_TOKEN),
      ignoreExpiration: false,
      secretOrKey: configServer.privateConfig.jwtConfig.key_rt,
    });
  }

  async validate(payload: IPayLoadUser) {
    const userExisted = await this.authService.getUserWithScope(payload.userId);

    if (!userExisted) {
      throw new UnauthorizedException(ERROR_MSG[ErrorCode.INVALID_TOKEN]);
    }

    const { role, roleId } = userExisted;
    const { scopes } = role;

    ContextService.setScopePermissions(scopes);
    ContextService.setRoleId(roleId);
    ContextService.setAuthUser(payload.userId);
    return {
      // access_token: await this.authService.newAccessToken(payload.userId),
    };
  }
}
