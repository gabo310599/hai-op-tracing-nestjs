/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatorDepartmentIntersection } from './entities/operator-department-intersection.entity';
import { Repository } from 'typeorm';
import { CreateOperatorDepartmentIntersectionDto } from './dtos/create-operator-department-intersection.dto';
import { Operator } from 'src/operator/entities/operator.entity';
import { Department } from 'src/department/entities/department.entity';

@Injectable()
export class OperatorDepartmentIntersectionService {

    constructor(
        @InjectRepository(OperatorDepartmentIntersection)
        private operatorDepartmentIntersectionRepository: Repository<OperatorDepartmentIntersection>,

        @InjectRepository(Operator)
        private operatorRepository: Repository<Operator>,

        @InjectRepository(Department)
        private departmentRepository: Repository<Department>
    ) {}

    //Metodo que retorna todos los registros
    async getAll() {
        const data = await this.operatorDepartmentIntersectionRepository.find({
            relations:{
                operator: true,
                department: true
            }
        });
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna un registro especifico
    async getOne(id: string) {
        const data = await this.operatorDepartmentIntersectionRepository.findOne({ 
            where:{
                id: id
            },
            relations:{
                operator: true,
                department: true
            } 
        });

        if (!data) throw new NotFoundException('El registro no existe');

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que elimina un registro especifico
    async deleteOne(id: string){
        const data = await this.operatorDepartmentIntersectionRepository.delete(id);
    
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que crea una asociacion entre operador y departamento
    async createIntersection(dto: CreateOperatorDepartmentIntersectionDto){
        
        const operator = await this.operatorRepository.findOneBy({ id: dto.operator_id });
        const department = await this.departmentRepository.findOneBy({ id: dto.department_id });
        
        if(!operator) throw new NotFoundException('El registro de operador no existe'); 

        if(!department) throw new NotFoundException('El registro de departamento no existe'); 

        const intersection = new OperatorDepartmentIntersection(operator, department);
        const data = await this.operatorDepartmentIntersectionRepository.save(intersection);
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }
    
}
