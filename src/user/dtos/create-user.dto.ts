/* eslint-disable prettier/prettier */

import { IsString, MaxLength, MinLength } from "class-validator";


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
    
}