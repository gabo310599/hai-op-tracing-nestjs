/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateOperatorDepartmentUnionDto } from './dtos/create-operator-department-union.dto';
import { OperatorDepartmentUnionService } from './operator-department-union.service';

@ApiTags('Operator - Department Module')
@Controller('operator-department-union')
export class OperatorDepartmentUnionController {

    constructor(private readonly operatorDepartmentService: OperatorDepartmentUnionService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.operatorDepartmentService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.operatorDepartmentService.getOne(id);
    }

    //Endpoint que crea un registro
    @Post()
    createOne( @Body() dto: CreateOperatorDepartmentUnionDto ){
        return this.operatorDepartmentService.createOne(dto);
    }

    //Endpoint que elimina un registro
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.operatorDepartmentService.deleteOne(id);
    }
}
