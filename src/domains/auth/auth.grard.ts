import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { ForbiddenError } from 'src/handlers/errors';
import { AccessTokenPayload, createAccessToken, decodeToken } from 'src/libs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (authorization) {
      const [scheme, token] = authorization.split(' ');

      const decode = decodeToken(token);
      return !!(scheme.toLowerCase() === 'bearer' && !isEmpty(decode));
    }
    throw new ForbiddenError('인증정보를 다시 확인해주세요.');
  }
}

export const mockAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const payload: AccessTokenPayload = {
      id: 1,
      userId: 'feelsky665@naver.com',
      idType: 'BUSINESS_NO',
    };

    const token = createAccessToken(payload)

    request.headers['authorization'] = `Bearer ${token}`
    return true;
  },
};
