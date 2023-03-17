/* eslint-disable prettier/prettier */
import { Department } from 'src/department/entities/department.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { RequestNote } from 'src/request-note/entities/request-note.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

@Entity('processes')
export class Process{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => RequestNote, (request) => request.process)
    request: RequestNote;

    @ManyToOne(() => Department, (department) => department.process)
    department: Department;

    @ManyToOne(() => Operator, (operator) => operator.process)
    operator: Operator;

    @ManyToOne(() => Machine, (machine) => machine.process)
    machine: Machine;

    @Column({type:'datetime', nullable: true})
    date_in: Date;

    @Column({type:'datetime', nullable: true})
    date_out: Date;
 
    @Column({type:'decimal', precision: 10, scale: 2, default: 0})
    hours_in: number;

}