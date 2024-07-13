import { Post, Body, Controller } from '@nestjs/common';
import { AddUserDto, LoginDto } from '../dto';
import { UserService } from '../services/user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ApiCommonResponse,
  createErrorSchema,
  ERROR,
} from 'src/libs/swagger/utils';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiOperation({ summary: '유저 생성' })
  @ApiCommonResponse({})
  signUp(@Body() addUser: AddUserDto) {
    return this.userService.signup(addUser);
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  @ApiCommonResponse({
    properties: {
      token: {
        type: 'string',
        description: 'jwt token',
      },
    },
  })
  @ApiResponse({
    status: ERROR.BAD_REQUEST.code,
    description: '아이디 혹은 비밀번호가 일치하지 않을 경우',
    schema: createErrorSchema(
      ERROR.BAD_REQUEST,
      '로그인 정보가 유효하지 않습니다.',
    ),
  })
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
