/* eslint-disable prettier/prettier */
import { Process } from '../../process/entities/process.entity';
import { ProductionOrder } from '../../production-order/entities/production-order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('request_notes')
export class RequestNote{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'varchar', length: 20})
    serial: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    description: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    code: string;
    
    @Column({type: 'varchar', length: 10, nullable: true})
    characters: string;

    @OneToMany(() => Process, (process) => process.request)
    process: Process[];

    @OneToMany(() => ProductionOrder, (order) => order.request)
    order: ProductionOrder[];

}