import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { parseFromJson } from '../common/utils';
import { ContextService } from '../providers/context.service';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization) {
      const token = request.headers.authorization.replace('Bearer ', '');
      const payloadToken = jsonwebtoken.decode(token, { json: true });
      // console.log('\n==> payloadToken =', payloadToken);

      if (!payloadToken) return next.handle();

      ContextService.setAuthUser(payloadToken.sub);
      ContextService.setAuthAccessToken(token);
      ContextService.setAuthUserEmail(payloadToken.email);
      ContextService.setRolesContext(parseFromJson(payloadToken.roles));
    }

    return next.handle();
  }
}
