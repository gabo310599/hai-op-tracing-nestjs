/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    //Endpoint que retorna todos los registros
    @Get()
    async getAll(){
        return await this.userService.getAll();
    }

    //Endpoint que retornar un solo registro
    @Get(':id')
    getOne( @Param('id', ParseIntPipe) id: number ){
        return this.userService.getOne(id);
    }

    //Endpoint que crea un registro
    @Post()
    createOne( @Body() dto: CreateUserDto ){
        return this.userService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @Put(':id')
    updateOne( @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto ){
        return this.userService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Delete(':id')
    deleteOne( @Param('id', ParseIntPipe) id: number ){
        return this.userService.deleteOne(id);
    }
    
}
