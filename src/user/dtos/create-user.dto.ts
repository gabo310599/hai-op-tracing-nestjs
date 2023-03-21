/* eslint-disable prettier/prettier */

import { IsArray, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { AppRoles } from "src/app.roles";


export class CreateUserDto{

    @IsString()
    @MaxLength(30)
    name: string;

    @IsString()
    @MaxLength(30)
    last_name: string;

    @IsString()
    @MaxLength(30)
    user_name: string;

    @IsString()
    @MinLength(5)
    @MaxLength(150)
    password: string;
    
    @IsOptional()
    @IsArray()
    @IsEnum(AppRoles, {
        each: true,
        message: `must be a valid role value`
    })
    roles: string[];
}