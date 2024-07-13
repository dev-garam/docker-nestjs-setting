import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isEmpty } from 'lodash';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const oldSend = res.send;

    res.send = function (body: any): Response<any, Record<string, any>> {
      res.statusCode = res.statusCode === 201 ? 200 : res.statusCode;

      if (res.statusCode >= 400) {
        return oldSend.call(this, body);
      }
      const modifiedBody = {
        ...(!isEmpty(body) && JSON.parse(body)),
        resultCode: res.statusCode,
        resultMsg: 'OK',
      };

      return oldSend.call(this, JSON.stringify(modifiedBody));
    };

    next();
  }
}
