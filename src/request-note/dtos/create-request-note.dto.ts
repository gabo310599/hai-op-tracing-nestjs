/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class CreateRequestNoteDto{

    @IsString()
    serial: string;

    @IsString()
    description: string;

    @IsString()
    code: string;

    @IsOptional()
    @IsString()
    characters: string;
    
}