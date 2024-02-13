import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';
import { TTypeLogger } from '@common/interfaces/logger.interface';
import { GeneralLogger } from '@shared/services/logger-general.service';
import { stringifyAnObject } from '@common/utils';
import { STATUS_CODES } from 'http';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

type TException = HttpException | QueryFailedError | Error | ValidationError;

const standardizeStatusCode = (
  exception: any,
): [HttpStatus, HttpStatus, string, string] => {
  let ex = exception;

  if (Array.isArray(exception) && exception.length) {
    ex = exception[0];
  }

  const errorRes = ex.getResponse() as any;
  const { response: res, ...restOfException } = errorRes;

  const response = res?.response || res;

  const statusCode = response?.statusCode || restOfException?.statusCode;
  const { code, appErrorCode } = restOfException;
  const appCode = response?.appErrorCode || appErrorCode;

  let description = res?.message || restOfException?.description;

  if (!description && Array.isArray(restOfException?.message)) {
    description = restOfException?.message[0] || restOfException?.description;
  }

  return [statusCode, code, appCode, description];
};

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    public reflector: Reflector,
    private _generalLogger: GeneralLogger,
  ) {}

  catch(exception: TException, host: ArgumentsHost) {
    // eslint-disable-next-line no-console
    ['development', 'staging'].includes(process.env.NODE_ENV) &&
      console.log('Stack', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { type, appCode, responseBody } = this.handleConvertException(exception);

    this._generalLogger.error(
      stringifyAnObject({
        context: responseBody?.message || 'Unknown',
        stack: exception,
        appCode,
        type,
      }),
    );
    return response.status(responseBody.statusCode).json(responseBody);
  }

  handleConvertException(exception: TException) {
    let responseBody: Record<string, any> = {
      message: 'Internal server error',
    };
    let appCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let type: TTypeLogger;

    if (exception instanceof QueryFailedError) {
      appCode =
        exception.message && exception.message.startsWith('UQ')
          ? HttpStatus.CONFLICT
          : HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = {
        statusCode: appCode,
        error: STATUS_CODES[appCode],
        message: exception.message,
      };
      type = 'Database error';
    } else if (exception instanceof HttpException) {
      const [statusCode, code, error, description] = standardizeStatusCode(exception);
      appCode = code;

      responseBody = {
        statusCode: statusCode,
        error,
        message: description || 'Some thing wrong',
      };
      type = 'Unknown';
    } else if (exception instanceof Error) {
    }
    return { type, appCode, responseBody };
  }
}
