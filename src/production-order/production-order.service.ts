/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductionOrder } from './entities/production-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductionOrderDto } from './dtos/create-production-order.dto';
import { UpdateProductionOrderDto } from './dtos/update-production-order.dto';
import { RequestNote } from 'src/request-note/entities/request-note.entity';
import { CreateRequestOrderUnionDto } from './dtos/create-request-order-union.dto';
import { GetOrdersByRequestDto } from './dtos/get-orders-by-request-serial.dto';

@Injectable()
export class ProductionOrderService {

    constructor(
        @InjectRepository(ProductionOrder)
        private productionOrderRepository: Repository<ProductionOrder>,

        @InjectRepository(RequestNote)
        private requestRepository: Repository<RequestNote>

    ) {}

    //Metodo que retorna todos los registros
    async getAll() {
        const data = await this.productionOrderRepository.find();
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna un registro especifico
    async getOne(id: string) {
        const data = await this.productionOrderRepository.findOneBy({ id: id });

        if (!data) throw new NotFoundException('El registro no existe');

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que crea un registro
    async createOne(dto: CreateProductionOrderDto) {
        const productionOrder = this.productionOrderRepository.create(dto);
        const data = await this.productionOrderRepository.save(productionOrder);
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que actualiza un registro especifico
    async updateOne(id: string, dto: UpdateProductionOrderDto) {
        const productionOrder = await this.productionOrderRepository.findOneBy({ id: id });

        if (!productionOrder) throw new NotFoundException('El registro no existe');

        const updatedProductionOrder = Object.assign(productionOrder, dto);
        const data = await this.productionOrderRepository.save(updatedProductionOrder);

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que elimina un registro especifico
    async deleteOne(id: string){
        const data = await this.productionOrderRepository.delete(id);
    
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que devuelve todas las ordenes asociadas a un serial de pedido
    async getOrdersByRequestSerial(dto: GetOrdersByRequestDto){

        const requests = await this.requestRepository.find({
            where:{ 
                serial: dto.serial
            }
        });

        if(!requests) throw new NotFoundException('El serial no esta asociado a ningun pedido');

        const data = await this.productionOrderRepository.find({
            where:{
                request: requests
            }
        });

        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que crea la union entre un pedido y una orden
    async createRequestOrderUnion(dto: CreateRequestOrderUnionDto){

        const request = await this.requestRepository.findOneBy({id: dto.request_id});
        const order = await this.productionOrderRepository.findOneBy({id: dto.order_id});

        if(!request) throw new NotFoundException('El registro de pedido no existe');
        if(!order) throw new NotFoundException('El registro de orden no existe');

        order.request = request;
        const data = await this.productionOrderRepository.save(order);

        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que retorna las ordenes asociada a un pedido (serial + letra)
    async getOrdersByRequest(dto: GetOrdersByRequestDto){

        const request = await this.requestRepository.findOne({
            where:{
                serial: dto.serial,
                characters: dto.characters
            }
        });

        if(!request) throw new NotFoundException('El registro de pedido no existe')

        const data = await this.productionOrderRepository.find({
            where:{
                request: request
            }
        });

        return {
            msg: "Peticion correcta",
            data: data
        }
    }
}
