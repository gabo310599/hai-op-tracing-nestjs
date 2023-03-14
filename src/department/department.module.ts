/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DepartmentController } from './department.controller';
import { Department } from './entities/department.entity';
import { DepartmentService } from './department.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Department])
    ],
    controllers: [DepartmentController],
    providers: [DepartmentService],
})
export class DepartmentModule {}
