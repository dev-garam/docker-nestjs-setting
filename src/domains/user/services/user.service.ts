import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/schemas/mysql/user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto, LoginDto } from '../dto';
import { hash } from 'src/libs/encrypt';
import config from 'src/config';
import { BadRequestError, ServiceUnavailableError } from 'src/handlers/errors';
import * as jwt from '../../../libs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  /**
   * @description idValue 복호화의 여부?
   */
  async signup(addUser: AddUserDto) {
    addUser = {
      ...addUser,
      password: hash(addUser.password, config.KEY.PASSWORD_SECRET),
      idValue: hash(addUser.idValue, config.KEY.PASSWORD_SECRET),
    };

    try {
      await this.userRepo.save(addUser);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestError('이미 존재하는 아이디입니다.');
      } else {
        throw new ServiceUnavailableError(e.message);
      }
    }

    return {};
  }

  async findById(id: number) {
    return await this.userRepo.findOne({
      where: { id },
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: {
        userId: loginDto.userId,
      },
    });

    if (
      !user ||
      user.password !== hash(loginDto.password, config.KEY.PASSWORD_SECRET)
    ) {
      throw new BadRequestError('로그인 정보가 유효하지 않습니다.');
    }

    const payload = {
      id: user.id,
      userId: user.userId,
      idType: user.idType,
    };
    // jwt token 생성
    const token = jwt.createAccessToken(payload);
    return {
      token,
    };
  }
}
