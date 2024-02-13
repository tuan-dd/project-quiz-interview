import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GeneralLogger } from '../shared/services/logger-general.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private _generalLogger: GeneralLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const { method, url, ip } = request;
    const now = Date.now();
    const userAgent = request.get('user-agent');

    return next
      .handle()
      .pipe(
        tap(() =>
          this._generalLogger.log(`${now} - ${ip} - ${method} - ${url} - ${userAgent}`),
        ),
      );
  }
}
