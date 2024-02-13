import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from '@shared/services/config.service';
import { EKeyHeader } from '@common/enums/header.enum';
import { IPayLoadUser } from '@common/interfaces/payload-user.interface';
import { AuthService } from '@auth/auth.service';
import { ERROR_MSG } from '@common/constants/error-code';
import { ErrorCode } from '@common/enums';
import { ContextService } from '@providers/context.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configServer: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(EKeyHeader.ACCESS_TOKEN),
      ignoreExpiration: false,
      secretOrKey: configServer.privateConfig.jwtConfig.key_at,
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
    ContextService.setRoleId(roleId.toString());
    ContextService.setAuthUser(payload.userId);

    return true;
  }
}
