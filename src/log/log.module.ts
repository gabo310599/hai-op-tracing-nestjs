/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Log } from './entities/log.entity';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Log, User])
    ],
    controllers: [LogController],
    providers: [LogService]
})
export class LogModule {}
