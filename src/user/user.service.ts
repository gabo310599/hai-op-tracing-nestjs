/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>

    ){}

    //Metodo que retorna todos los registros
    async getAll() {
        const data = await this.userRepository.find();
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna un registro especifico
    async getOne(id: string) {
        const data = await this.userRepository.findOneBy({ id: id });

        if (!data) throw new NotFoundException('El registro no existe');

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que crea un registro
    async createOne(dto: CreateUserDto) {
        
        const userExist = await this.userRepository.findOneBy({ user_name: dto.user_name});

        if(userExist) throw new BadRequestException('El nombre de usuario ya existe');

        const user = this.userRepository.create(dto);
        const data = await this.userRepository.save(user);
        delete data.password;

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que actualiza un registro especifico
    async updateOne(id: string, dto: UpdateUserDto) {

        const adminUser = await this.userRepository.findOneBy({user_name: 'admin'});
        const userExist = await this.userRepository.findOneBy({ user_name: dto.user_name});

        if(userExist && dto.user_name) throw new BadRequestException('El usuario ya existe');

        if(adminUser.id === id) throw new BadRequestException('El usuario admin no se puede actualizar.');

        const user = await this.userRepository.findOneBy({ id: id });

        if (!user) throw new NotFoundException('El registro no existe');

        const updatedUser = Object.assign(user, dto);
        const data = await this.userRepository.save(updatedUser);

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que elimina un registro especifico
    async deleteOne(id: string){

        const adminUser = await this.userRepository.findOneBy({user_name: 'admin'});

        if(adminUser.id === id) throw new BadRequestException('El usuario admin no se puede eliminar.');

        const data = await this.userRepository.delete(id);
    

        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que busca un usuario por su nombre de usuario
    async findByUserName(user_name: string){
        return await this.userRepository
            .createQueryBuilder('user')
            .where({ user_name })
            .addSelect('user.password')
            .getOne()
    }
}
