/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../department/entities/department.entity';
import { Machine } from '../machine/entities/machine.entity';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Machine, Department])
    ],
    controllers: [MachineController],
    providers: [MachineService],
})
export class MachineModule {}
