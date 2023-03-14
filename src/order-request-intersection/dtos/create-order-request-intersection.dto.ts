/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateOrderRequestIntersectionDto{

    @IsString()
    order_id: string;

    @IsString()
    request_id: string;
    
}