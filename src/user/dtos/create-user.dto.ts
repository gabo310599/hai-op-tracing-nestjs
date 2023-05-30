/* eslint-disable prettier/prettier */

import { IsArray, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { AppRoles } from "../../app.roles";


export class CreateUserDto{

    constructor( 
        user_name: string,
        password: string,
        operator_id: string,
        roles: AppRoles[]
    ){
        this.user_name = user_name;
        this.password = password;
        this.operator_id = operator_id;
        this.roles = roles;
    }

    @IsString()
    @MaxLength(30)
    user_name: string;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    password: string;

    @IsOptional()
    @IsString()
    operator_id: string;
    
    @IsOptional()
    @IsArray()
    @IsEnum(AppRoles, {
        each: true,
        message: `must be a valid role value`
    })
    roles: AppRoles[];
}