/* eslint-disable prettier/prettier */
import { Department } from 'src/department/entities/department.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('operators_departments_union')
export class OperatorDepartmentUnion{

    constructor(operator: Operator, department: Department){
        this.department = department;
        this.operator = operator;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Operator, (operator) => operator.operatorDepartmentUnion)
    operator: Operator;

    @ManyToOne(() => Department, (department) => department.operatorDepartmentUnion)
    department: Department;
}