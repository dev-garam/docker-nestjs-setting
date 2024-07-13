import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  Validate,
} from '@nestjs/class-validator';
import { IdTypeValidator } from 'src/libs/validator';
import { IdType, IdTypeEnum } from 'src/domains/user/types';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty({ description: '유저 아이디(이메일 형식)' })
  @IsEmail(
    {},
    {
      groups: ['userId'],
      message: '아이디는 이메일 형식만 가능합니다.',
    },
  )
  userId: string;

  @ApiProperty({ description: '유저 이름' })
  @IsString({
    groups: ['name'],
    message: '이름은 문자만 가능합니다.',
  })
  name: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty({ groups: ['password'], message: '비밀번호를 입력해주세요.' })
  password: string;

  @ApiProperty({ description: '유저 타입', enum: IdTypeEnum })
  @IsEnum(IdTypeEnum, {
    message: `${Object.keys(IdTypeEnum).join(',')} 값만 허용됩니다.`,
  })
  idType: IdType;

  @ApiProperty({
    description:
      'idType 이 REG_NO 일 경우 주민등록번호\n BUSINESS_NO일 경우 사업자 번호\n(- 포함)',
  })
  @Validate(IdTypeValidator)
  idValue: string;
}

export class LoginDto {
  @ApiProperty({ description: '아이디(이메일 형식)' })
  @IsNotEmpty({ message: '아이디를 확인해주세요' })
  userId: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty({ message: '비밀번호를 확인해주세요' })
  password: string;
}
