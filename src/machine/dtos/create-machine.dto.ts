/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { AreaEnum } from '../enums/area.enum';

export class CreateMachineDto{

    @IsString()
    brand: string;

    @IsString()
    model: string;
    
    @IsString()
    name: string;

    @IsString()
    area: AreaEnum;

    @IsString()
    department_id: string;

    @IsOptional()
    @IsNumber()
    total_white_hours: number;

    @IsOptional()
    @IsNumber()
    total_black_hours: number;

    @IsOptional()
    @IsNumber()
    total_points: number;
    
}