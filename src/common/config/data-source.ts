/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";
import {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USERNAME,
  } from './constants';
  import { ConfigService } from "@nestjs/config";

const config = new ConfigService();

export const dataSource = new DataSource({
    type: 'mysql',
    host: config.get<string>(DATABASE_HOST),
    port: parseInt(config.get<string>(DATABASE_PORT), 10),
    username: config.get<string>(DATABASE_USERNAME),
    password: config.get<string>(DATABASE_PASSWORD),
    database: config.get<string>(DATABASE_NAME),
});