/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  
  initSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  
  await app.listen(3000);
  logger.log(`Server is runnig in ${ await app.getUrl()}`);
}
bootstrap();
