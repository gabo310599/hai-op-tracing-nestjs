/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Department } from 'src/department/entities/department.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { OperatorDepartmentIntersection } from './entities/operator-department-intersection.entity';
import { OperatorDepartmentIntersectionController } from './operator-department-intersection.controller';
import { OperatorDepartmentIntersectionService } from './operator-department-intersection.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([OperatorDepartmentIntersection, Operator, Department])
    ],
    controllers: [OperatorDepartmentIntersectionController],
    providers: [OperatorDepartmentIntersectionService],
})
export class OperatorDepartmentIntersectionModule {}
