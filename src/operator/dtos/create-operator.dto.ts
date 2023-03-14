/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateOperatorDto{

    @IsString()
    name: string;

    @IsString()
    last_name: string;
}