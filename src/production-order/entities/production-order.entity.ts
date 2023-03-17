/* eslint-disable prettier/prettier */
import { RequestNote } from 'src/request-note/entities/request-note.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { WarpedEnum } from '../enums/warped.enum';

@Entity('production-orders')
export class ProductionOrder{

    constructor(request: RequestNote ){
        this.request = request;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'varchar', length: 20, unique: true})
    op_number: string;

    @Column({type: 'int'})
    width: number;

    @Column({type: 'enum', enum: WarpedEnum})
    warped: WarpedEnum;

    @Column({type: 'int'})
    points: number;

    @ManyToOne(() => RequestNote, (request) => request.order)
    request: RequestNote;

}