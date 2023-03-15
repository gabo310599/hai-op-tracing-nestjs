/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestNoteModule } from './request-note/request-note.module';
import { ProductionOrderModule } from './production-order/production-order.module';
import { DepartmentModule } from './department/department.module';
import { OperatorModule } from './operator/operator.module';
import { OperatorDepartmentIntersectionModule } from './operator-department-intersection/operator-department-intersection.module';
import { OrderRequestIntersectionModule } from './order-request-intersection/order-request-intersection.module';
import { MachineModule } from './machine/machine.module';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '2649',
      database: 'hai-op-tracing',
      entities: [__dirname + './**/**/*entity{.ts, .js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    RequestNoteModule,
    ProductionOrderModule,
    DepartmentModule,
    OperatorModule,
    OperatorDepartmentIntersectionModule,
    OrderRequestIntersectionModule,
    MachineModule,
    ProcessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
