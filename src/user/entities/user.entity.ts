/* eslint-disable prettier/prettier */
import { hash } from 'bcryptjs';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('users')
export class User{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'varchar', length: 30})
    name: string;

    @Column({type: 'varchar', length: 30})
    last_name: string;

    @Column({type: 'varchar', length: 30, nullable: false, unique: true})
    user_name: string;

    @Column({type: 'varchar', length: 150, nullable: false, select: false})
    password: string;

    @Column({type: "bool", default: true})
    status: boolean;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.password){
            return;
        }
        this.password = await hash(this.password, 10);
    }


}