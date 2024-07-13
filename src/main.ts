import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { GlobalExceptionFilter } from './handlers/errorHandler';
import { setupSwagger } from './libs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new GlobalExceptionFilter()); 
  setupSwagger(app);
  await app.listen(config.PORT);
}
bootstrap();
