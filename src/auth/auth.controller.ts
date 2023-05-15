/* eslint-disable prettier/prettier */
import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Auth } from '../common/decorators/auth.decorator';
import { UserDecorator } from '../common/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth Module')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async login( @UserDecorator() user: User, @Body() dto: LoginDto){

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
