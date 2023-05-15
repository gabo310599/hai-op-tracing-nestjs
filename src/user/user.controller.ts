/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { AppRoles } from '../app.roles';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Auth } from '../common/decorators/auth.decorator';
import { HasRoles } from '../common/decorators/role.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User Module')
@Controller('user')
export class UserController {

    constructor( private readonly userService: UserService){}

    //Endpoint que retorna todos los registros
    @Auth()
    @Get()
    async getAll(){
        return await this.userService.getAll();
    }

    //Endpoint que retorna un solo registro
    @Auth()
    @Get(':id')
    getOne( @Param('id') id: string ){
        return this.userService.getOne(id);
    }

    //Endpoint que crea un registro
    @Post()
    createOne( @Body() dto: CreateUserDto ){
        return this.userService.createOne(dto);
    }

    //Endpoint que actualiza un registro
    @HasRoles(AppRoles.ADMIN)
    @UseGuards(RolesGuard)
    @Auth()
    @Put(':id')
    updateOne( @Param('id') id: string, @Body() dto: UpdateUserDto ){
        return this.userService.updateOne(id, dto);
    }

    //Endpoint que elimina un registro
    @Auth()
    @Delete(':id')
    deleteOne( @Param('id') id: string ){
        return this.userService.deleteOne(id);
    }

    //Enpoint que retorna un usuario por nombre de usuario
    @Auth()
    @Get('/find-by/user-name/:user_name')
    getOneByUserName( @Param('user_name') user_name: string ){
        return this.userService.findByUserName(user_name)
    }

    //Enpoint que retorna si un nombre de usuario existe en la base de datos
    @Get('/exist/:user_name')
    async exist( @Param('user_name') user_name: string ){
        const user =  await this.userService.findByUserName(user_name);
        if(user)
            return true;
        else
            return false;
    }

    //Endpoint que retorna un usuario a traves del operario
    @Auth()
    @Get('/get-by-operator/:id')
    getOneByOperator( @Param('id') operator_id: string ){
        return this.userService.getOneByOperator(operator_id);
    }

}
