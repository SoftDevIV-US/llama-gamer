import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import AppModule from './app.module';
import CORS from './config/cors.config';
import { DESCRIPTION, ENV, PORT, PREFIX, TITLE, VERSION } from './utils/constants';

async function main() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors(CORS);
  app.setGlobalPrefix(PREFIX);

  if (ENV === 'development' || ENV === 'testing' || ENV === 'staging') {
    const config = new DocumentBuilder()
      .setTitle(TITLE)
      .setDescription(DESCRIPTION)
      .setVersion(VERSION)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(PREFIX, app, document);
  }

  await app.listen(PORT);
}

main().catch((err: Error) => {
  throw new Error(err.message);
});
