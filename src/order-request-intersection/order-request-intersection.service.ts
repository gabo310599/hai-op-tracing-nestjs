/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRequestIntersection } from './entities/order-request-intersection.entity';
import { Repository } from 'typeorm';
import { ProductionOrder } from 'src/production-order/entities/production-order.entity';
import { RequestNote } from 'src/request-note/entities/request-note.entity';
import { CreateOrderRequestIntersectionDto } from './dtos/create-order-request-intersection.dto';

@Injectable()
export class OrderRequestIntersectionService {

    constructor(
        @InjectRepository(OrderRequestIntersection)
        private orderRequestIntersectionRepository: Repository<OrderRequestIntersection>,

        @InjectRepository(ProductionOrder)
        private orderRepository: Repository<ProductionOrder>,

        @InjectRepository(RequestNote)
        private requestRepository: Repository<RequestNote>
    ) {}

    //Metodo que retorna todos los registros
    async getAll() {
        const data = await this.orderRequestIntersectionRepository.find({
            relations:{
                order: true,
                request: true
            }
        });
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna un registro especifico
    async getOne(id: string) {
        const data = await this.orderRequestIntersectionRepository.findOne({ 
            where:{
                id: id
            },
            relations:{
                order: true,
                request: true
            }
        });

        if (!data) throw new NotFoundException('El registro no existe');

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que elimina un registro especifico
    async deleteOne(id: string){
        const data = await this.orderRequestIntersectionRepository.delete(id);
    
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que crea una asociacion entre orden y pedido
    async createIntersection(dto: CreateOrderRequestIntersectionDto){
        
        const order = await this.orderRepository.findOneBy({ id: dto.order_id });
        const request = await this.requestRepository.findOneBy({ id: dto.request_id });
        
        if(!order) throw new NotFoundException('El registro de orden no existe'); 

        if(!request) throw new NotFoundException('El registro de pedido no existe'); 

        const intersection = new OrderRequestIntersection(order, request);
        const data = await this.orderRequestIntersectionRepository.save(intersection);
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }
}
