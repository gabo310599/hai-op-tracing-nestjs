/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateOperatorDepartmentIntersectionDto{

    @IsString()
    operator_id: string;

    @IsString()
    department_id: string;

}