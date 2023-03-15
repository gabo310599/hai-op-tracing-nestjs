/* eslint-disable prettier/prettier */
import { Department } from 'src/department/entities/department.entity';
import { Process } from 'src/process/entities/process.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';

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

    @Column({type: 'varchar', length: 50})
    name: string;

    @Column({type: 'int', nullable: true})
    total_points: number;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
    total_white_hours: number;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
    total_black_hours: number;

    @ManyToOne(() => Department, (department) => department.machine)
    department: Department;

    @OneToMany(() => Process, (process) => process.machine)
    process: Process[];

}