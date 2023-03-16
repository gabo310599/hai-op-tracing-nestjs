/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { RequestNote } from 'src/request-note/entities/request-note.entity';
import { Process } from './entities/process.entity';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Process, RequestNote, Department, Operator, Machine])
    ],
    controllers: [ProcessController],
    providers: [ProcessService],
})
export class ProcessModule {}
