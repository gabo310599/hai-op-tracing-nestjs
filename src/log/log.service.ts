/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dtos/create-log.dto';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {

    constructor(

        @InjectRepository(Log)
        private readonly logRepository: Repository<Log>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>

    ){}

    //Metodo que retorna todos los registros
    async getAll() {
        const data = await this.logRepository.find({relations: { user: true }});
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna un registro especifico
    async getOne(id: string) {
        const data = await this.logRepository.findOne({
            where:{
                id: id
            },
            relations:{
                user: true
            }
        });

        if (!data) throw new NotFoundException('El registro no existe');

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que obtiene los logs de un usuario
    async getLogsByUser(user_id: string){

        const user = await this.userRepository.findOneBy({id: user_id});

        if(!user) throw new NotFoundException('El usuario no se encuentra registrado');

        const data = await this.logRepository
                            .createQueryBuilder()
                            .where({user})
                            .getMany()

        return {
            msg: 'Peticion correcta',
            data: {
                log: data,
                user: user
            }
        };

    }

    //Metodo que crea un registro en el log
    async createOne(dto: CreateLogDto) { 
        
        try{
            
            const user = await this.userRepository.findOneBy({ id: dto.user_id});

            const log = new Log(user);
            log.user = user;
            log.log = dto.log;
            log.log_date = new Date();
            
            const data = await this.logRepository.save(log);
    
            return {
                msg: 'Peticion correcta',
                data: data,
            };
            
        }catch(error){
            console.log(error.message)
        }

    }
}
