/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateLogDto{

    @IsString()
    user_id: string;

    @IsString()
    log: string;
    
}