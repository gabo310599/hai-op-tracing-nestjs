/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './entities/process.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Process])
    ],
})
export class ProcessModule {}
