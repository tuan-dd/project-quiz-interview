import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

export interface IErrorMessage {
  message: string;
  description: string;
  statusCode: HttpStatus;
  errorStatusCode: ErrorCode;
}
