/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { AreaEnum } from '../enums/area.enum';
import { WarpedEnum } from '../../production-order/enums/warped.enum';

export class CreateMachineDto{

    @IsString()
    brand: string;

    @IsString()
    model: string;
    
    @IsString()
    number: string;

    @IsString()
    area: AreaEnum;

    @IsOptional()
    @IsString()
    warped_color: WarpedEnum;

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