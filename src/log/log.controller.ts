/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateLogDto } from './dtos/create-log.dto';
import { LogService } from './log.service';

@ApiTags('Log Module')
@Controller('log')
export class LogController {

    constructor( private readonly logService: LogService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.logService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.logService.getOne(id);
    }

    //Endpoint que regresa los logs de un usuario
    @Get('/user/:id')
    getLogsByUser( @Param('id') user_id: string){
        return this.logService.getLogsByUser(user_id);
    }

    //Endpoint que crea un registro
    @Auth()
    @Post()
    createOne( @Body() dto: CreateLogDto ){
        return this.logService.createOne(dto);
    }

}
