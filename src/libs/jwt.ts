import { timestamp } from './date'
import config from '../config'
import { ForbiddenError, UnAuthorizedError } from 'src/handlers/errors'
import { IdType } from 'src/domains/user/types';
const jwt = require('jsonwebtoken');

export interface Payload {
  [key: string]: any
}

export interface AccessTokenPayload extends Payload {
  id: number;
  userId: string;
  idType: IdType;
}

export const createKey = () => timestamp().toString()

export const createAccessToken = (payload: AccessTokenPayload) => {
  const secret = config.JWT.SECRET;
  return jwt.sign(
    {
      ...payload,
      tokenType: 'access',
    },
    secret,
    {
      expiresIn: config.JWT.ACCESS_EXPIRES_IN,
    },
  );
}

export const decodeToken = (token: string) => {
  const _token = token.replace('Bearer ', '')
  verify(_token)
  return jwt.decode(_token) as Payload;
}

export const verify = (token: string) => {
  try {

    jwt.verify(token, config.JWT.SECRET)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) throw new ForbiddenError('권한이 만료되었습니다.')
    throw new UnAuthorizedError('유효하지 않은 토큰입니다.')
  }
}