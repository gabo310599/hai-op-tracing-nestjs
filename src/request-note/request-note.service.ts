/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestNote } from './entities/request-note.entity';
import { Repository } from 'typeorm';
import { CreateRequestNoteDto } from './dtos/create-request-note.dto';
import { UpdateRequestNoteDto } from './dtos/update-request-note.dto';
import { ProductionOrder } from 'src/production-order/entities/production-order.entity';

@Injectable()
export class RequestNoteService {

    constructor(

        @InjectRepository(RequestNote)
        private requestNoteRepository: Repository<RequestNote>,

        @InjectRepository(ProductionOrder)
        private orderRepository: Repository<ProductionOrder>

    ) {}

    //Metodo que retorna todos los registros
    async getAll() {
        const data = await this.requestNoteRepository.find();
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna un registro especifico
    async getOne(id: string) {
        const data = await this.requestNoteRepository.findOneBy({ id: id });

        if (!data) throw new NotFoundException('El registro no existe');

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que crea un registro
    async createOne(dto: CreateRequestNoteDto) {
        const requestNote = this.requestNoteRepository.create(dto);
        const data = await this.requestNoteRepository.save(requestNote);
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que actualiza un registro especifico
    async updateOne(id: string, dto: UpdateRequestNoteDto) {
        const requestNote = await this.requestNoteRepository.findOneBy({ id: id });

        if (!requestNote) throw new NotFoundException('El registro no existe');

        const updatedRequestNote = Object.assign(requestNote, dto);
        const data = await this.requestNoteRepository.save(updatedRequestNote);

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que elimina un registro especifico
    async deleteOne(id: string){
        const data = await this.requestNoteRepository.delete(id);
    
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

}
