/* eslint-disable prettier/prettier */
import { Department } from 'src/department/entities/department.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('operator-department-intersection')
export class OperatorDepartmentIntersection{

    constructor(operator: Operator, department: Department){
        this.operator = operator;
        this.department = department;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => Operator)
    @JoinColumn()
    operator: Operator;

    @OneToOne(() => Department)
    @JoinColumn()
    department: Department;

    
}