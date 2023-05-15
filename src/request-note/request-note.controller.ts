/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Auth } from '../common/decorators/auth.decorator';
import { CreateRequestNoteDto } from './dtos/create-request-note.dto';
import { UpdateRequestNoteDto } from './dtos/update-request-note.dto';
import { RequestNoteService } from './request-note.service';

@ApiTags('Request Note Module')
@Controller('request-note')
export class RequestNoteController {

    constructor(private readonly requestNoteService: RequestNoteService){}

    //Endpoint que retorna todos los registros
    @Auth()
    @Get()
    async getAll(){
        return await this.requestNoteService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Auth()
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.requestNoteService.getOne(id);
    }

    //Endpoint que crea un registro
    @Auth()
    @Post()
    createOne( @Body() dto: CreateRequestNoteDto ){
        return this.requestNoteService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Auth()
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateRequestNoteDto ){
        return this.requestNoteService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Auth()
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.requestNoteService.deleteOne(id);
    }

}
