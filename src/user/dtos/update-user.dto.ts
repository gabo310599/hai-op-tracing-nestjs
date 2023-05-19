/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { AppRoles } from '../../app.roles';

export class UpdateUserDto extends PartialType(CreateUserDto){

    constructor( 
        user_name: string,
        password: string,
        operator_id: string,
        roles: AppRoles[],
        status: boolean,
    ){
        super(user_name,password,operator_id,roles)
        this.status = status;
        this.operator_id = operator_id
    }

    @IsOptional()
    @IsBoolean()
    status: boolean;

    @IsOptional()
    @IsString()
    operator_id: string;
}