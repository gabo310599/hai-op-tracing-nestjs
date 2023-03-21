/* eslint-disable prettier/prettier */
import { UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){

    handleRequest(err, user){

        if(err || !user){
            throw err || new UnauthorizedException('No estas autenticado.')   
        }

        return user;

    }
        
}