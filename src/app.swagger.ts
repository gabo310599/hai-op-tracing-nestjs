/* eslint-disable prettier/prettier */
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Hai OP Tracing API')
        .addBearerAuth()
        .setDescription(
            'Esta es una API creada con NestJS con CRUD para la empresa textil Hai.'
        )
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, document);
};