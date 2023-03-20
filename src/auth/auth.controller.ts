/* eslint-disable prettier/prettier */
import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth Module')
@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login( @Req() req: any){
        return req.user;
    }

    @Get('/profile')
    profile(){
        return "Estos son tus datos";
    }

}
