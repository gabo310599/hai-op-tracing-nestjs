/* eslint-disable prettier/prettier */
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('logs')
export class Log{

    constructor(user: User){
        this.user = user;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.log)
    user: User;

    @Column({type: 'varchar', length: 500, nullable: false})
    log: string;

    @Column({type:'timestamp', nullable: true})
    log_date: Date;

}