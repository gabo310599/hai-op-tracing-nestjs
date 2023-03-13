/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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
        const data = await this.userRepository.save(user);
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que actualiza un registro especifico
    async updateOne(id: number, dto: UpdateUserDto){
        const user = await this.userRepository.findOneBy({id: id});
        
        if(!user) throw new NotFoundException('El usuario no existe')
        
        const updatedUser = Object.assign(user, dto);
        const data = await this.userRepository.save(updatedUser);

        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que elimina un registro especifico
    async deleteOne(id: number){
        const data = await this.userRepository.delete(id);
        return {
            msg: "Peticion correcta",
            data: data
        }
    }
    
}
