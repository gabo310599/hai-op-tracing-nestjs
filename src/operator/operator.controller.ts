/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateOperatorDto } from './dtos/create-operator.dto';
import { UpdateOperatorDto } from './dtos/update-operator.dto';
import { OperatorService } from './operator.service';

@ApiTags('Operator Module')
@Controller('operator')
export class OperatorController {

    constructor(private readonly operatorService: OperatorService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.operatorService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.operatorService.getOne(id);
    }

    //Endpoint que crea un registro
    @Post()
    createOne( @Body() dto: CreateOperatorDto ){
        return this.operatorService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateOperatorDto ){
        return this.operatorService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.operatorService.deleteOne(id);
    }
    
}
