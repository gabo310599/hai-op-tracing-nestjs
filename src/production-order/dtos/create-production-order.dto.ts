/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';
import { WarpedEnum } from '../enums/warped.enum';

export class CreateProductionOrderDto{

    @IsString()
    op_number: string;

    @IsNumber()
    width: number;

    @IsString()
    warped: WarpedEnum;

    @IsNumber()
    points: number;

}