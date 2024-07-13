import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiCommonResponse = (
  obj: SchemaObject & Partial<ReferenceObject>,
) => {
  return applyDecorators(
    ApiOkResponse(<any>{
      schema: {
        properties: {
          ...(obj.properties || {}),
          resultCode: {
            type: 'number',
            example: 200,
          },
          resultMsg: {
            example: 'OK',
          },
        },
      },
    }),
  );
};

export const ERROR = {
  BAD_REQUEST: {
    code: 400,
    message: 'BadRequestError',
    name: 'BadRequestError',
  },
  UNAUTORIZED: {
    code: 401,
    message: 'UnAuthorizedError',
    name: 'UnAuthorizedError',
  },
  FORBIDDEN: { code: 403, message: 'ForbiddenError', name: 'ForbiddenError' },
  NOT_FOUND_DATA: {
    code: 405,
    message: 'NotFoundDataError',
    name: 'NotFoundDataError',
  },
  NEATIVE_NUMBER: {
    code: 409,
    message: 'NeativeNumberError',
    name: 'NeativeNumberError',
  },
  QUOTE_EXPIRED: {
    code: 410,
    message: 'QuoteExpiredError',
    name: 'QuoteExpiredError',
  },
  LIMIT_EXCESS: {
    code: 411,
    message: 'LimitExcessError',
    name: 'LimitExcessError',
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    message: 'ServiceUnavailableError',
    name: 'ServiceUnavailableError',
  },
} as const;

type KeyOfError = keyof typeof ERROR;
type ValueOfError = (typeof ERROR)[KeyOfError];

export const createErrorSchema = (
  error: ValueOfError,
  message?: string,
): SchemaObject => {
  return {
    type: 'object',
    properties: {
      code: { type: 'number', example: error.code },
      name: { type: 'string', example: error.name },
      message: { type: 'string', example: message || error.message },
    },
  };
};
