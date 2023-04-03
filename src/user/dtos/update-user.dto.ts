/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto){

    @IsOptional()
    @IsBoolean()
    status: boolean;

    @IsOptional()
    @IsString()
    operator_id: string;
}