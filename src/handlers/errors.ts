export default class InternalError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export class BadRequestError extends InternalError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

export class UnAuthorizedError extends InternalError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'UnAuthorizedError';
  }
}

export class ForbiddenError extends InternalError {
  constructor(message: string) {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundDataError extends InternalError {
  constructor(message: string) {
    super(message, 405);
    this.name = 'NotFoundDataError';
  }
}


export class NeativeNumberError extends InternalError {
  constructor(message: string = 'Neative Number Exception') {
    super(message, 409);
    this.name = 'NeativeNumberError';
  }
}

export class QuoteExpiredError extends InternalError {
  constructor(message: string = 'Quote Expired Exception') {
    super(message, 410);
    this.name = 'QuoteExpiredError';
  }
}
export class LimitExcessError extends InternalError {
  constructor(message: string = 'Limit Expired Exception') {
    super(message, 411);
    this.name = 'LimitExcessError';
  }
}

export class ServiceUnavailableError extends InternalError {
  constructor(message: string = 'Unavailable Service Exception') {
    super(message, 503);
    this.name = 'ServiceUnavailableError';
  }
}
