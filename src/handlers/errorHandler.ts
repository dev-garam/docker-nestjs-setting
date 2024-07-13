import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import ServiceError, { BadRequestError } from './errors';

const errorResponse = (err: Error) => {
  return {
    error: err.name,
    resultMsg: err.message,
    debug: err.stack,
  };
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(err: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let statusCode = err.code || 500;
    const error = errorResponse({
      ...err,
      message: err?.response?.message || err.message,
    });
    if (err instanceof ServiceError) statusCode = err.code;
    response.status(statusCode).json({
      ...error,
      resultCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
