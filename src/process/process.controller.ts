/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateProcessDto } from './dtos/create-process.dto';
import { UpdateProcessDto } from './dtos/update-process.dto';
import { ProcessService } from './process.service';

@ApiTags('Process Module')
@Controller('process')
export class ProcessController {

    constructor( private readonly processService: ProcessService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.processService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.processService.getOne(id);
    }

    //Endpoint que crea un registro
    @Post()
    createOne( @Body() dto: CreateProcessDto ){
        return this.processService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateProcessDto ){
        return this.processService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.processService.deleteOne(id);
    }
}
