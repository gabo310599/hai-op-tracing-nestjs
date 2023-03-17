/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateProductionOrderDto } from './dtos/create-production-order.dto';
import { CreateRequestOrderUnionDto } from './dtos/create-request-order-union.dto';
import { GetOrdersByRequestDto } from './dtos/get-orders-by-request-serial.dto';
import { UpdateProductionOrderDto } from './dtos/update-production-order.dto';
import { ProductionOrderService } from './production-order.service';

@ApiTags('Production Order Module')
@Controller('production-order')
export class ProductionOrderController {

    constructor(private readonly productionOrderService: ProductionOrderService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.productionOrderService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.productionOrderService.getOne(id);
    }

    //Endpoint que crea un registro
    @Post()
    createOne( @Body() dto: CreateProductionOrderDto ){
        return this.productionOrderService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateProductionOrderDto ){
        return this.productionOrderService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.productionOrderService.deleteOne(id);
    }

    //Enpoint que crea la union entre un pedido y una orden
    @Put('/request-note/union')
    createRequestOrderUnion( @Body() dto: CreateRequestOrderUnionDto){
        return this.productionOrderService.createRequestOrderUnion(dto);
    }

    //Endpoint que devuelve todas las ordenes asociadas a un serial de pedido
    @Get('/all/orders-by-request-serial')
    getOrdersByRequestSerial( @Body() dto: GetOrdersByRequestDto){
        return this.productionOrderService.getOrdersByRequestSerial(dto);
    }

    //Endpoint que devuelve todas las ordenes asociadas a un pedido (serial + letra)
    @Get('/all/orders-by-request')
    getOrdersByRequest( @Body() dto: GetOrdersByRequestDto){
        return this.productionOrderService.getOrdersByRequest(dto);
    }
}
