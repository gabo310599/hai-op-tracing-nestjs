/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateUserDto{

    @IsString()
    user: string;

    @IsString()
    password: string;

}