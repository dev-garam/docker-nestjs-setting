import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { AuthGuard, mockAuthGuard } from 'src/domains/auth/auth.grard';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('회원가입 idType REG_NO, idValue 사업자번호 (실패 유도)', async () => {
    const userData = {
      userId: 'tesUSER@naver.com',
      name: '가람',
      password: 'test123!@#',
      idType: 'REG_NO',
      idValue: '342-32-11111',
    };

    await request(app.getHttpServer())
      .post('/user/signup')
      .set('Accept', 'application/json')
      .type('application/json')
      .send(userData)
      .then((res) => {
        expect(res.body?.resultCode).toBe(500);
      });
  });


  it('정상 회원가입', async () => {
    const userData = {
      userId: 'feelsky665@naver.com',
      name: '가람',
      password: 'test123!@#',
      idType: 'BUSINESS_NO',
      idValue: '342-32-11111',
    };

    await request(app.getHttpServer())
      .post('/user/signup')
      .set('Accept', 'application/json')
      .type('application/json')
      .send(userData)
      .then((res) => {
        expect(res.body?.resultCode).toBe(200);
      });
  });

  it('로그인 시도', async () => {
    return await request(app.getHttpServer())
      .post('/user/login')
      .set('Accept', 'application/json')
      .type('application/json')
      .send({ userId: 'feelsky665@naver.com', password: '123' });
  });

  afterAll(async () => {
    await app.close();
  });
});
