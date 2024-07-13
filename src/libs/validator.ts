import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { isNumber } from 'lodash';

export const isJumin = (val = '') => {
  const regex =
    /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])[-]*[1-4]\d{6}/g;
  return regex.test(val);
};

export const isComNum = (val = '') => {
  const regex = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;
  return regex.test(val);
};

@ValidatorConstraint({})
export class IdTypeValidator implements ValidatorConstraintInterface {
  validate(val: any, args?: ValidationArguments): boolean | Promise<boolean> {
    let result = false;
    if (args.object['idType'] === 'REG_NO') {
      result = isJumin(val);
    } else if (args.object['idType'] === 'BUSINESS_NO') {
      result = isComNum(val);
    }
    return result;
  }

  defaultMessage(args: ValidationArguments) {
    return '사업자번호 혹은 법인등록번호를 입력해주세요.';
  }
}

export class IsNumberic implements ValidatorConstraintInterface {
  validate(val: any, args?: ValidationArguments): boolean | Promise<boolean> {
   return isNumber(+val); 
  }

  defaultMessage(args: ValidationArguments) {
    return '숫자, 숫자 형태의 문자만 가능합니다.';
  }
}
