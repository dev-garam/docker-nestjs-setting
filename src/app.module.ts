import { MySQLModule } from './schemas/mysql/index.module';
import { UserModule } from './domains/user/modules/user.module';
import { GlobalExceptionFilter } from './handlers/errorHandler';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ResponseMiddleware } from './middleware/response.middleware';

@Module({
  imports: [MySQLModule, UserModule],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseMiddleware).forRoutes('*');
  }
}
