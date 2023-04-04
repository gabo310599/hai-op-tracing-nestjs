/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateProcessDto } from './dtos/create-process.dto';
import { UpdateProcessDto } from './dtos/update-process.dto';
import { ProcessService } from './process.service';

@ApiTags('Process Module')
@Controller('process')
export class ProcessController {

    constructor( private readonly processService: ProcessService){}

    //Endpoint que retorna todos los registros
    @Auth()
    @Get()
    async getAll(){
        return await this.processService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Auth()
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.processService.getOne(id);
    }

    //Endpoint que crea un registro
    @Auth()
    @Post()
    createOne( @Body() dto: CreateProcessDto ){
        return this.processService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Auth()
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateProcessDto ){
        return this.processService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Auth()
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.processService.deleteOne(id);
    }

    //Endpoint que retorna cuantos procesos activos hay por departamento
    @Auth()
    @Get('/count/by-department')
    async getProcessCountByDepartment(){
        return await this.processService.getProcessCountByDepartment();
    }

    //Endpoint que retorna que departamentos tienen al menos un pedido retrasado en proceso
    @Auth()
    @Get('/delay/by-department')
    async getDepartmentsDelay(){
        return await this.processService.getDepartmentsDelay();
    }

    //Endpoint que retorna una lista de los procesos con retrasos por departamento
    @Auth()
    @Get('/delay/list-by-department')
    async getListOfDelayProcess(){
        return await this.processService.getListOfDelayProcess();
    }

    //Endpoint que retorna los procesos activos de un departamento
    @Auth()
    @Get('/active/by-department/:department_id')
    async getActiveProcessByDepartment(  @Param('department_id') department_id: string ){
        return await this.processService.getActiveProcessByDepartment(department_id);
    }
}
