/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Auth } from '../common/decorators/auth.decorator';
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

    //Endpoint que retorna los procesos de un departamento
    @Auth()
    @Get('/by-department/:department_id')
    async getProcessByDepartment(  @Param('department_id') department_id: string ){
        return await this.processService.getProcessByDepartment(department_id);
    }

    //Endpoint que retorna una lista de pedidos esperando entrar a un departamento.
    @Auth()
    @Get('list/check-in/:id')
    getCheckInProcesses( @Param('id') id: string ){
        return this.processService.getCheckInProcesses(id);
    }

    //Endpoint que retorna una lista de pedidos dentro de un departamento.
    @Auth()
    @Get('list/check-out/:id')
    getCheckOutProcesses( @Param('id') id: string ){
        return this.processService.getCheckOutProcesses(id);
    }

    //Endpoint que retorna una lista de pedidos sin op en el departamento generar op
    @Auth()
    @Get('/get/request-whithout-op/generate-op/:id')
    getRequestWithoutOpInGenerateOP( @Param('id') department_id: string ){
        return this.processService.getRequestWithoutOpInGenerateOP(department_id);
    }

    //Endpoint que retorna una lista de pedidos dentro de un departamento sin maquina asociada.
    @Auth()
    @Get('/get/process-without-machine/:id')
    getProcessWithoutMachines( @Param('id') id: string ){
        return this.processService.getProcessWithoutMachines(id);
    }

    //Endpoint que retorna una lista de procesos completados dentro de un departamento.
    @Auth()
    @Get('/get/complete-by-department/:id')
    getCompleteProcessesByDepartment( @Param('id') id: string ){
        return this.processService.getCompleteProcessesByDepartment(id);
    }

    //Endpoint que retorna lista de procesos que se encuentren en una maquina especifica.
    @Auth()
    @Get('/get/by-machine/:id')
    getProcessesInMachine( @Param('id') id: string ){
        return this.processService.getProcessesInMachine(id);
    }

    //Endpoint que devuelve una lista de pedidos con su ultimo proceso activo.
    @Auth()
    @Get('/get/last-active')
    getLastActiveProcesses(){
        return this.processService.getLastActiveProcesses();
    }

    //Endpoint que retorna los procesos de un pedido especifico para la linea de tiempo.
    @Auth()
    @Get('/get/for-time-line/:id')
    getProcessForTimeLine( @Param('id') id: string ){
        return this.processService.getProcessForTimeLine(id);
    }

    //Endpoint que retorna el historial de procesos.
    @Auth()
    @Get('/get/history')
    getHistory(){
        return this.processService.getHistory();
    }

    //Endpoint que retorna una lista de procesos que tengan alguna observacion.
    @Auth()
    @Get('/get/by-observation')
    getByObservation(){
        return this.processService.getByObservation();
    }

    //Endpoint que devuelve los pedidos que aun no entren a ningun departamento.
    @Auth()
    @Get('/get/request-without-check-in')
    getRequestWithoutCheckIn(){
        return this.processService.getRequestWithoutCheckIn();
    }

    //Endpoint que devuelve las ordenes que aun no entren a ningun departamento.
    @Auth()
    @Get('/get/order-without-check-in')
    getOrderWithoutCheckIn(){
        return this.processService.getOrderWithoutCheckIn();
    }

    //Endpoint que devuelve la cantidad de pedidos nuevos que hay en el sistema.
    @Auth()
    @Get('/get/new-request-count')
    getNewRequestCount(){
        return this.processService.getNewRequestCount();
    }

    //Endpoint que devuelve los pedidos antes de entrar a tejeduria.
    @Auth()
    @Get('/get/request-before-weaving')
    getRequestBeforeWeaving(){
        return this.processService.getRequestBeforeWeaving();
    }

    //Endpoint que devuelve las ordenes antes de entrar a tejeduria.
    @Auth()
    @Get('/get/order-before-weaving')
    getOrderBeforeWeaving(){
        return this.processService.getOrderBeforeWeaving();
    }
}
