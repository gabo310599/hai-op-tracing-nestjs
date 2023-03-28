/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare} from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';

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
    async login(user: any){

        try{

            let {id} = user;
        

            if(!id){
                const {data} = user;
                id = data.id
            }

            const payload = { sub: id }

            return{
                user,
                accessToken: this.jwtService.sign(payload)
            }

        }catch(error){
            console.log(error);
        };
        
    }
}
