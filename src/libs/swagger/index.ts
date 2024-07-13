import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
  .setTitle('NEST SERVER API Docs')
  .setDescription('')
  .setVersion('1.0.0')
  .build();

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document);
};