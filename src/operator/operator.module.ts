/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Operator } from './entities/operator.entity';
import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Operator])
    ],
    controllers: [OperatorController],
    providers: [OperatorService],
})
export class OperatorModule {}
