/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateOperatorDepartmentIntersectionDto } from './dtos/create-operator-department-intersection.dto';
import { OperatorDepartmentIntersectionService } from './operator-department-intersection.service';

@ApiTags('Operator - Department Module')
@Controller('operator-department-intersection')
export class OperatorDepartmentIntersectionController {

    constructor(private readonly operatorDepartmentIntersectionService: OperatorDepartmentIntersectionService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.operatorDepartmentIntersectionService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.operatorDepartmentIntersectionService.getOne(id);
    }

    //Endpoint que elimina un registro
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.operatorDepartmentIntersectionService.deleteOne(id);
    }

    //Endpoint que crea una asociacion de un operador con un departamento
    @Post()
    createIntersection( @Body() dto: CreateOperatorDepartmentIntersectionDto){
        return this.operatorDepartmentIntersectionService.createIntersection(dto);
    }
    
}
