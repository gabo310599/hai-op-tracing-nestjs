/* eslint-disable prettier/prettier */
import { Machine } from 'src/machine/entities/machine.entity';
import { OperatorDepartmentUnion } from 'src/operator-department-union/entities/operator-department-union.entity';
import { Process } from 'src/process/entities/process.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('departments')
export class Department{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'varchar', length: 30})
    name: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    days_time_limit: number;

    @OneToMany(() => Machine, (machine) => machine.department)
    machine: Machine[];

    @OneToMany(() => Process, (process) => process.department)
    process: Process[];

    @OneToMany(() => OperatorDepartmentUnion, (operatorDepartmentUnion) => operatorDepartmentUnion.department)
    operatorDepartmentUnion: OperatorDepartmentUnion[];

}
