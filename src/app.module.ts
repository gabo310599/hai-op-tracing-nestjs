/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestNoteModule } from './request-note/request-note.module';
import { ProductionOrderModule } from './production-order/production-order.module';
import { DepartmentModule } from './department/department.module';
import { OperatorModule } from './operator/operator.module';
import { MachineModule } from './machine/machine.module';
import { ProcessModule } from './process/process.module';
import { OperatorDepartmentUnionModule } from './operator-department-union/operator-department-union.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from './common/config/constants';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>(DATABASE_HOST),
        port: parseInt(config.get<string>(DATABASE_PORT), 10),
        username: config.get<string>(DATABASE_USERNAME),
        password: config.get<string>(DATABASE_PASSWORD),
        database: config.get<string>(DATABASE_NAME),
        entities: [__dirname + './**/**/*entity{.ts, .js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'file',
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AccessControlModule.forRoles(roles),
    RequestNoteModule,
    ProductionOrderModule,
    DepartmentModule,
    OperatorModule,
    MachineModule,
    ProcessModule,
    OperatorDepartmentUnionModule,
    UserModule,
    AuthModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
