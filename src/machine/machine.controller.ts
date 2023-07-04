/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Auth } from '../common/decorators/auth.decorator';
import { CreateMachineDto } from './dtos/create-machine.dto';
import { UpdateMachineDto } from './dtos/update-machine.dto';
import { MachineService } from './machine.service';
import { WarpedEnum } from '../production-order/enums/warped.enum';

@ApiTags('Machine Module')
@Controller('machine')
export class MachineController {

    constructor(private readonly machineService: MachineService){}

    //Endpoint que retorna todos los registros
    @Auth()
    @Get()
    async getAll(){
        return await this.machineService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Auth()
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.machineService.getOne(id);
    }

    //Endpoint que crea un registro
    @Auth()
    @Post()
    createOne( @Body() dto: CreateMachineDto ){
        return this.machineService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Auth()
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateMachineDto ){
        return this.machineService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Auth()
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.machineService.deleteOne(id);
    }

    //Endpoint que retorna una lista de maquinas por departamento
    @Auth()
    @Get("get/by-department/:id")
    getMachinesByDepartment( @Param('id') id: string ){
        return this.machineService.getMachinesByDepartment(id);
    }

    //Endpoint que retorna una lista con las maquinas de tejeduria segun su urdido
    @Auth()
    @Get("get/by-warped/:warped_color")
    getMachinesByWarped( @Param('warped_color') warped_color: string ){

        if(warped_color === "negro")
            return this.machineService.getMachinesByWarped(WarpedEnum.NEGRO);
        else
            if(warped_color === "blanco")
                return this.machineService.getMachinesByWarped(WarpedEnum.BLANCO);
    }
}
