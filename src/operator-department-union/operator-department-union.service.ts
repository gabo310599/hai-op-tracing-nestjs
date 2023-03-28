/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { Repository } from 'typeorm';
import { CreateOperatorDepartmentUnionDto } from './dtos/create-operator-department-union.dto';
import { OperatorDepartmentUnion } from './entities/operator-department-union.entity';

@Injectable()
export class OperatorDepartmentUnionService {

    constructor(

        @InjectRepository(OperatorDepartmentUnion)
        private readonly operatorDepartmentUnionRepository: Repository<OperatorDepartmentUnion>,

        @InjectRepository(Operator)
        private readonly operatorRepository: Repository<Operator>,

        @InjectRepository(Department)
        private departmentRepository: Repository<Department>

    ) {}

    //Metodo que retorna todos los registros
    async getAll() {
        const data = await this.operatorDepartmentUnionRepository.find({
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
        const data = await this.operatorDepartmentUnionRepository.findOne({ 
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

    //Metodo que crea un registro
    async createOne(dto: CreateOperatorDepartmentUnionDto) {

        try{

            const operator = await this.operatorRepository.findOneBy({id: dto.operator_id});
            const department = await this.departmentRepository.findOneBy({id: dto.department_id});
    
            if (!operator) throw new NotFoundException('El registro de operador no existe');
            if (!department) throw new NotFoundException('El registro de departamento no existe');
    
            const union = new OperatorDepartmentUnion(operator, department);
            const data = await this.operatorDepartmentUnionRepository.save(union);
    
            return {
                msg: 'Peticion correcta',
                data: data,
            };
            
        }catch(error){
            console.log(error)
        }

    }

    //Metodo que elimina un registro especifico
    async deleteOne(id: string){
        const data = await this.operatorDepartmentUnionRepository.delete(id);
    
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que regresa todos los operarios de un departamento especifico
    async getOperatorsByDepartment(id_department: string){
        
        const department = await this.departmentRepository.findOneBy({id: id_department});

        if(!department) throw new NotFoundException('El registro de departamento no exite');

        const intersection = await this.operatorDepartmentUnionRepository.find({
            where:{
                department: department
            },
            relations:{
                operator: true
            }
        });

        const data = [];

        intersection.map(function (record){
            data.push(record.operator);
        });

        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que regresa todos los operarios de un departamento especifico
    async getDepartmentsByOperator(id_operator: string){
        
        const operator = await this.operatorRepository.findOneBy({id: id_operator});

        if(!operator) throw new NotFoundException('El registro de departamento no exite');

        const intersection = await this.operatorDepartmentUnionRepository.find({
            where:{
                operator: operator
            },
            relations:{
                department: true
            }
        });

        const data = [];

        intersection.map(function (record){
            data.push(record.department);
        });

        return {
            msg: "Peticion correcta",
            data: data
        }
    }

}
