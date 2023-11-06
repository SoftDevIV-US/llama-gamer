import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import AppModule from './app.module';
import { DESCRIPTION, NODE_ENV, PORT, PREFIX, TITLE, VERSION } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (NODE_ENV === 'development' || NODE_ENV === 'testing' || NODE_ENV === 'staging') {
    const config = new DocumentBuilder().setTitle(TITLE).setDescription(DESCRIPTION).setVersion(VERSION).build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(PREFIX, app, document);
  }

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(PREFIX);
  app.enableCors();

  await app.listen(PORT, '0.0.0.0');
}

bootstrap().catch((err: Error) => {
  throw new Error(err.message);
});
