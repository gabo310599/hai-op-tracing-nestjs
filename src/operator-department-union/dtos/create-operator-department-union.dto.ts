/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateOperatorDepartmentUnionDto{

    @IsString()
    operator_id: string;

    @IsString()
    department_id: string;
} 