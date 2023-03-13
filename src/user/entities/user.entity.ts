/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    user: string;

    @Column({type: 'varchar', length: 255})
    password: string;

}