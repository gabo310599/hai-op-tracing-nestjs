/* eslint-disable prettier/prettier */
import { OperatorDepartmentUnion } from 'src/operator-department-union/entities/operator-department-union.entity';
import { Process } from 'src/process/entities/process.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

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

    @OneToMany(() => OperatorDepartmentUnion, (operatorDepartmentUnion) => operatorDepartmentUnion.operator)
    operatorDepartmentUnion: OperatorDepartmentUnion;

}