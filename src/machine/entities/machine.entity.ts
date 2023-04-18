/* eslint-disable prettier/prettier */
import { Department } from 'src/department/entities/department.entity';
import { Process } from 'src/process/entities/process.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { AreaEnum } from '../enums/area.enum';

@Entity('machines')
export class Machine{

    constructor(department: Department){
        this.department = department;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'varchar', length: 50})
    brand: string;

    @Column({type: 'varchar', length: 50})
    model: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    name: string;

    @Column({type: 'enum', enum: AreaEnum})
    area: AreaEnum;

    @Column({type: 'int', default: 0})
    total_points: number;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    total_white_hours: number;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    total_black_hours: number;

    @ManyToOne(() => Department, (department) => department.machine, {nullable: true})
    department: Department;

    @OneToMany(() => Process, (process) => process.machine)
    process: Process[];

}