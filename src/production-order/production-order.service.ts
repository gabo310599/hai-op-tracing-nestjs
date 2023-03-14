/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductionOrder } from './entities/production-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductionOrderDto } from './dtos/create-production-order.dto';
import { UpdateProductionOrderDto } from './dtos/update-production-order.dto';

@Injectable()
export class ProductionOrderService {

    constructor(
        @InjectRepository(ProductionOrder)
        private productionOrderRepository: Repository<ProductionOrder>,
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
}
