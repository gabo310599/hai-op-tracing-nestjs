/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class CreateDepartmentDto{

    @IsString()
    name: string;

    @IsNumber()
    days_time_limit: number;

    @IsNumber()
    process_turn: number;

}