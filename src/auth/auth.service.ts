/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare} from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    //Metodo que valida el usuario
    async validateUser(user_name: string, password: string): Promise<any>{
    
        const user = await this.userService.findByUserName(user_name);

        if(user && await compare(password, user.password)){
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...rest } = user;
            return rest;
        }
        
        return null;
    }

    //Metodo de login
    async login(user: User){

        const {id} = user;
        const payload = { sub: id}

        return{
            user,
            accessToken: this.jwtService.sign(payload)
        }
    }
}
