/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class GetOrdersByRequestDto{

    @IsString()
    serial: string;

    @IsOptional()
    @IsString()
    characters: string;

}