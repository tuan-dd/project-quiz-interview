import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { Observable } from 'rxjs';
import * as geoIp from 'geoip-lite';

import { ContextService } from '../providers/context.service';

@Injectable()
export class RequestInfoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // if (request.headers.authorization) {
    // const token = request?.headers?.authorization?.replace('Bearer ', '');
    // const obj = jsonwebtoken.decode(token, { json: true });
    // if (!obj) return next.handle();

    const { ip } = request;
    const location = geoIp.lookup(ip);
    const reqInfo = {
      ipAddress: ip,
      location: location?.country || null,
      userAgent: request.get('user-agent'),
    };

    ContextService.setRequestInfo(reqInfo);
    // }

    return next.handle();
  }
}
