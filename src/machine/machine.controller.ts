/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { UpdateDepartmentDto } from 'src/department/dtos/update-department.dto';
import { CreateMachineDto } from './dtos/create-machine.dto';
import { MachineService } from './machine.service';

@ApiTags('Machine Module')
@Controller('machine')
export class MachineController {

    constructor(private readonly machineService: MachineService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.machineService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.machineService.getOne(id);
    }

    //Endpoint que crea un registro
    @Post()
    createOne( @Body() dto: CreateMachineDto ){
        return this.machineService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateDepartmentDto ){
        return this.machineService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.machineService.deleteOne(id);
    }
}
