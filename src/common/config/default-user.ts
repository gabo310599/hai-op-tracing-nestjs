/* eslint-disable prettier/prettier */

import { ConfigService } from "@nestjs/config";
import { User } from "src/user/entities/user.entity";
import { getRepository } from "typeorm";

export const setDefaultUser = async (config: ConfigService) => {

    const userRepository = getRepository<User>(User)

    
} 