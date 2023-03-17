/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateRequestOrderUnionDto{

    @IsString()
    order_id: string;

    @IsString()
    request_id: string;
    
}