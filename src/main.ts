/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initSwagger } from './app.swagger';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './common/config/constants';


async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  initSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  
  await app.listen(config.get<string>(SERVER_PORT));
  logger.log(`Server is runnig in ${ await app.getUrl()}`);
}
bootstrap();
