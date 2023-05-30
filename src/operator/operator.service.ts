/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operator } from './entities/operator.entity';
import { Repository } from 'typeorm';
import { CreateOperatorDto } from './dtos/create-operator.dto';
import { UpdateOperatorDto } from './dtos/update-operator.dto';

@Injectable()
export class OperatorService {

    constructor(
        @InjectRepository(Operator)
        private readonly operatorRepository: Repository<Operator>,
    ) {}

    //Metodo que retorna todos los registros
    async getAll() {
        const data = await this.operatorRepository.find();
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna un registro especifico
    async getOne(id: string) {
        const data = await this.operatorRepository.findOneBy({ id: id });

        if (!data) throw new NotFoundException('El registro no existe');

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que crea un registro
    async createOne(dto: CreateOperatorDto) {

        try{

            const operator = this.operatorRepository.create(dto);
            const data = await this.operatorRepository.save(operator);
            return {
                msg: 'Peticion correcta',
                data: data,
            };
            
        }catch(error){
            console.log(error.message)
        }

    }

    //Metodo que actualiza un registro especifico
    async updateOne(id: string, dto: UpdateOperatorDto) {

        try{

            const operator = await this.operatorRepository.findOneBy({ id: id });

            if (!operator) throw new NotFoundException('El registro no existe');
    
            const updatedOperator = Object.assign(operator, dto);
            const data = await this.operatorRepository.save(updatedOperator);
    
            return {
                msg: 'Peticion correcta',
                data: data,
            };
            
        }catch(error){
            console.log(error.message)
        }
        
    }

    //Metodo que elimina un registro especifico
    async deleteOne(id: string){
        const data = await this.operatorRepository.delete(id);
    
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

}
