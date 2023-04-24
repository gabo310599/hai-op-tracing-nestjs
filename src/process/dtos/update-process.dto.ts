/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessDto } from './create-process.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProcessDto extends PartialType(CreateProcessDto){

    @IsOptional()
    @IsString()
    observation: string;
    
}