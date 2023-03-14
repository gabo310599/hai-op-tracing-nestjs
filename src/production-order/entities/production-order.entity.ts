/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { WarpedEnum } from '../enums/warped.enum';

@Entity('production-orders')
export class ProductionOrder{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'varchar', length: 20})
    op_number: string;

    @Column({type: 'int'})
    width: number;

    @Column({type: 'enum', enum: WarpedEnum})
    warped: WarpedEnum;

    @Column({type: 'int'})
    points: number;

}