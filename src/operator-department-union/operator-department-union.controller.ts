/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateOperatorDepartmentUnionDto } from './dtos/create-operator-department-union.dto';
import { OperatorDepartmentUnionService } from './operator-department-union.service';

@ApiTags('Operator - Department Module')
@Controller('operator-department-union')
export class OperatorDepartmentUnionController {

    constructor(private readonly operatorDepartmentService: OperatorDepartmentUnionService){}

    //Endpoint que retorna todos los registros
    @Auth()
    @Get()
    async getAll(){
        return await this.operatorDepartmentService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Auth()
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.operatorDepartmentService.getOne(id);
    }

    //Endpoint que crea un registro
    @Auth()
    @Post()
    createOne( @Body() dto: CreateOperatorDepartmentUnionDto ){
        return this.operatorDepartmentService.createOne(dto);
    }

    //Endpoint que elimina un registro
    @Auth()
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.operatorDepartmentService.deleteOne(id);
    }

    //Endpoint que regresa todos los operarios de un departamento
    @Auth()
    @Get('operator-by-department/:id')
    getOperatorsByDepartment( @Param('id') id: string){
        return this.operatorDepartmentService.getOperatorsByDepartment(id);
    }

    //Endpoint que regresa todos los departamentos por operario
    @Auth()
    @Get('department-by-operator/:id')
    getDepartmentsByOperator( @Param('id') id: string){
        return this.operatorDepartmentService.getDepartmentsByOperator(id);
    }
}
