/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('operators')
export class Operator{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'varchar', length: 30})
    name: string;

    @Column({type: 'varchar', length: 30})
    last_name: string;

}