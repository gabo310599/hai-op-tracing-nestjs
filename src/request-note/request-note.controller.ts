/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateRequestNoteDto } from './dtos/create-request-note.dto';
import { UpdateRequestNoteDto } from './dtos/update-request-note.dto';
import { RequestNoteService } from './request-note.service';

@ApiTags('Request Note Module')
@Controller('request-note')
export class RequestNoteController {

    constructor(private readonly requestNoteService: RequestNoteService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.requestNoteService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.requestNoteService.getOne(id);
    }

    //Endpoint que crea un registro
    @Post()
    createOne( @Body() dto: CreateRequestNoteDto ){
        return this.requestNoteService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateRequestNoteDto ){
        return this.requestNoteService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.requestNoteService.deleteOne(id);
    }
}
