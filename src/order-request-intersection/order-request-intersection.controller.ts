/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateOrderRequestIntersectionDto } from './dtos/create-order-request-intersection.dto';
import { OrderRequestIntersectionService } from './order-request-intersection.service';

@ApiTags('Production Order - Request Note Module')
@Controller('order-request-intersection')
export class OrderRequestIntersectionController {

    constructor(private readonly orderRequestIntersectionService: OrderRequestIntersectionService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.orderRequestIntersectionService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.orderRequestIntersectionService.getOne(id);
    }

    //Endpoint que elimina un registro
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.orderRequestIntersectionService.deleteOne(id);
    }

    //Endpoint que crea una asociacion de una orden y un pedido
    @Post()
    createIntersection( @Body() dto: CreateOrderRequestIntersectionDto){
        return this.orderRequestIntersectionService.createIntersection(dto);
    }
}
