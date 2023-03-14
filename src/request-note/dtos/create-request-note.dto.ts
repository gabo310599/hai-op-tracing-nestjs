/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateRequestNoteDto{

    @IsString()
    serial: string;

    @IsString()
    description: string;

    @IsString()
    code: string;
    
}