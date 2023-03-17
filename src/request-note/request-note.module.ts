/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ProductionOrder } from 'src/production-order/entities/production-order.entity';
import { RequestNote } from './entities/request-note.entity';
import { RequestNoteController } from './request-note.controller';
import { RequestNoteService } from './request-note.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestNote, ProductionOrder])
    ],
    controllers: [RequestNoteController],
    providers: [RequestNoteService]
})
export class RequestNoteModule {}
