/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { RequestNote } from './entities/request-note.entity';
import { RequestNoteController } from './request-note.controller';
import { RequestNoteService } from './request-note.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestNote])
    ],
    controllers: [RequestNoteController],
    providers: [RequestNoteService]
})
export class RequestNoteModule {}
