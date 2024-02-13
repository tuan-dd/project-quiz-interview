import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

export const ERROR_MSG = {
  [ErrorCode.UNEXPECTED_ERROR]: {
    message: 'Server has by unexpected error. We fixed them soon',
    description: 'Server has by unexpected error. We fixed them soon',
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    appErrorCode: ErrorCode.UNEXPECTED_ERROR,
  },
  [ErrorCode.INVALID_TOKEN]: {
    message: 'Token is invalid',
    description: 'Token is missed or the provided token is a invalid token',
    statusCode: HttpStatus.UNAUTHORIZED,
    appErrorCode: ErrorCode.INVALID_TOKEN,
  },
  [ErrorCode.INVALID_PASSWORD]: {
    message: 'Password is invalid',
    description: 'Password is missed or the provided password is a invalid password',
    statusCode: HttpStatus.UNAUTHORIZED,
    appErrorCode: ErrorCode.INVALID_TOKEN,
  },
  [ErrorCode.TOKEN_EXPIRES]: {
    message: 'Token is expired',
    description: 'Token is expired',
    statusCode: HttpStatus.UNAUTHORIZED,
    appErrorCode: ErrorCode.TOKEN_EXPIRES,
  },
  [ErrorCode.NOT_FOUND_AUTH_USER]: {
    message: 'The current user is deleted!',
    description: 'The current user is deleted',
    statusCode: HttpStatus.NOT_FOUND,
    appErrorCode: ErrorCode.NOT_FOUND_AUTH_USER,
  },
  [ErrorCode.NOT_FOUND_USER]: {
    message: 'User does not found!',
    description: 'Cannot find any user based on the provided query condition',
    statusCode: HttpStatus.NOT_FOUND,
    appErrorCode: ErrorCode.NOT_FOUND_USER,
  },
  [ErrorCode.NO_SERVICE]: {
    message: 'Meet and assist services are not available',
    description: 'Cannot find any services based on the provided query condition',
    statusCode: HttpStatus.NOT_FOUND,
    appErrorCode: ErrorCode.NO_SERVICE,
  },
  [ErrorCode.INVALID_REQUEST]: {
    message: 'Request not type correct',
    description: 'Request not type correct',
    statusCode: HttpStatus.BAD_REQUEST,
    appErrorCode: ErrorCode.INVALID_REQUEST,
  },
  [ErrorCode.USER_EXISTED]: {
    message: 'The user is registered !',
    description: 'The user is registered',
    statusCode: HttpStatus.BAD_REQUEST,
    appErrorCode: ErrorCode.USER_EXISTED,
  },
  [ErrorCode.INCORRECT_ANSWER]: {
    message: 'The answer incorrect, try again',
    description: 'The answer incorrect, try again',
    statusCode: HttpStatus.BAD_REQUEST,
    appErrorCode: ErrorCode.INCORRECT_ANSWER,
  },
  [ErrorCode.NOT_FOUND_QUIZ]: {
    message: 'Quiz not found or expired',
    description: 'Quiz not found or expired',
    statusCode: HttpStatus.NOT_FOUND,
    appErrorCode: ErrorCode.NOT_FOUND_QUIZ,
  },
  [ErrorCode.NOT_FOUND_QUESTION]: {
    message: 'Question not found',
    description: 'Question not found',
    statusCode: HttpStatus.NOT_FOUND,
    appErrorCode: ErrorCode.NOT_FOUND_QUESTION,
  },
  [ErrorCode.UNAUTHORIZED_PLAY_QUIZ]: {
    message: 'Only user can play quiz',
    description: 'Only user can play quiz',
    statusCode: HttpStatus.UNAUTHORIZED,
    appErrorCode: ErrorCode.UNAUTHORIZED_PLAY_QUIZ,
  },
  [ErrorCode.USER_PLAYED_QUIZ]: {
    message: `Oh no you've already received your reward`,
    description: `Oh no you've already received your reward`,
    statusCode: HttpStatus.BAD_REQUEST,
    appErrorCode: ErrorCode.USER_PLAYED_QUIZ,
  },
};
