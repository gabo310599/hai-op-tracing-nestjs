/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateMachineDto{

    @IsString()
    brand: string;

    @IsString()
    model: string;

    @IsString()
    name: string;

    @IsString()
    department_id: string;
    
}