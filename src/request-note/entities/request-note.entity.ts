/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('request-notes')
export class RequestNote{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'varchar', length: 20})
    serial: string;

    @Column({type: 'varchar', length: 255})
    description: string;

    @Column({type: 'varchar', length: 20})
    code: string;
    
}