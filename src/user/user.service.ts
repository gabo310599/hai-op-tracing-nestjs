/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    constructor( 
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    //Metodo que retorna todos los registros
    async getAll(){
        const data = await this.userRepository.find();
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que retorna un registro especifico
    async getOne(id: number){
        const data = await this.userRepository.findOneBy({id: id});
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que crea un registro
    async createOne(dto: CreateUserDto){
        const user = this.userRepository.create(dto);
        return await this.userRepository.save(user);
    }

    //Metodo que actualiza un registro especifico
    updateOne(id: number, dto: UpdateUserDto){
        return { ok: "updateOne", id: id,body: dto }
    }

    //Metodo que elimina un registro especifico
    deleteOne(id: number){
        return { ok: "deleteOne", id: id }
    }
    
}
