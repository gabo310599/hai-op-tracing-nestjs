/* eslint-disable prettier/prettier */
import { Process } from 'src/process/entities/process.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('operators')
export class Operator{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'varchar', length: 30})
    name: string;

    @Column({type: 'varchar', length: 30})
    last_name: string;

    @OneToMany(() => Process, (process) => process.operator)
    process: Process[];

}