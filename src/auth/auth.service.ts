/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ){}

    //Metodo que valida el usuario
    async validateUser(user_name: string, password: string): Promise<any>{
        
        const user = await this.userService.findByUserName(user_name);

        console.log(user)

        if(user && password === user.password){
            return user
        }
        
        return null;
    }
}
