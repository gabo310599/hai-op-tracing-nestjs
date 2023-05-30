/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../department/entities/department.entity';
import { Machine } from '../machine/entities/machine.entity';
import { Operator } from '../operator/entities/operator.entity';
import { ProductionOrder } from '../production-order/entities/production-order.entity';
import { RequestNote } from '../request-note/entities/request-note.entity';
import { Process } from './entities/process.entity';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Process, RequestNote, Department, Operator, Machine, ProductionOrder])
    ],
    controllers: [ProcessController],
    providers: [ProcessService],
})
export class ProcessModule {}
