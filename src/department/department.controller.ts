/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Auth } from '../common/decorators/auth.decorator';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@ApiTags('Department Module')
@Controller('department')
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService){}

    //Endpoint que retorna todos los registros
    @Auth()
    @Get()
    async getAll(){
        return await this.departmentService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Auth()
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.departmentService.getOne(id);
    }

    //Endpoint que crea un registro
    @Auth()
    @Post()
    createOne( @Body() dto: CreateDepartmentDto ){
        return this.departmentService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Auth()
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateDepartmentDto ){
        return this.departmentService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Auth()
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.departmentService.deleteOne(id);
    }

    //Endpoint que obtiene un departamento por su nombre
    @Auth()
    @Post('/get/by-name')
    getOneByName( @Body() department_name: any ){
        return this.departmentService.getOneByName(department_name);
    }
}
