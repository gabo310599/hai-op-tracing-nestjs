/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { JWT_SECRET } from "src/common/config/constants";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private userService: UserService,
        private config: ConfigService
    ){
        super({
            secretOrKey: config.get<string>(JWT_SECRET),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        }); 
    }

    //Metodo para validar el jwt token
    async validate(payload: any){

        const { sub: id } = payload;

        return await this.userService.getOne(id);

    }

}