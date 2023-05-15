/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Department } from '../department/entities/department.entity';
import { Operator } from '../operator/entities/operator.entity';
import { OperatorDepartmentUnion } from './entities/operator-department-union.entity';
import { OperatorDepartmentUnionController } from './operator-department-union.controller';
import { OperatorDepartmentUnionService } from './operator-department-union.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([OperatorDepartmentUnion, Department, Operator])
    ],
    controllers: [OperatorDepartmentUnionController],
    providers: [OperatorDepartmentUnionService],
})
export class OperatorDepartmentUnionModule {}
