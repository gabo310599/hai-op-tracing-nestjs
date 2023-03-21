/* eslint-disable prettier/prettier */
import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth Module')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login( @UserDecorator() user: User){

        const data = await this.authService.login(user);

        return {
            msg: "Login exitoso",
            data
        };
    }

    @Auth()
    @Get('/profile')
    profile(@UserDecorator() user: User){
        return {
            msg: "Petición correcta",
            user
        };
    }

    @Auth()
    @Get('/refresh')
    async refresh( @UserDecorator() user: User){

        const data = await this.authService.login(user);

        return {
            msg: "Refresh exitoso",
            data
        };
    }

}
