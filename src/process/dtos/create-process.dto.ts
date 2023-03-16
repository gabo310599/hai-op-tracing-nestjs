/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class CreateProcessDto{

    @IsString()
    request_id: string;

    @IsString()
    department_id: string;

    @IsString()
    operator_id: string;

    @IsOptional()
    @IsString()
    machine_id: string;

    @IsString()
    date_in: string;

    @IsOptional()
    @IsString()
    date_out: string;

    @IsOptional()
    @IsString()
    time_in: string;
    
}