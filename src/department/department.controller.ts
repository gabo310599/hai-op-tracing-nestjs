/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@ApiTags('Department Module')
@Controller('department')
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.departmentService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.departmentService.getOne(id);
    }

    //Endpoint que crea un registro
    @Post()
    createOne( @Body() dto: CreateDepartmentDto ){
        return this.departmentService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateDepartmentDto ){
        return this.departmentService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.departmentService.deleteOne(id);
    }
}
