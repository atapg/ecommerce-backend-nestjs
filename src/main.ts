import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Necessary for using class-validators
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('v1/api');

  await app.listen(3000);
}

bootstrap();
