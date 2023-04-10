/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Injectable()
export class DepartmentService {

    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
    ) {}

    //Metodo que retorna todos los registros
    async getAll() {
        const data = await this.departmentRepository.find({
            relations: {
                machine: true
            }
        });
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna un registro especifico
    async getOne(id: string) {
        const data = await this.departmentRepository.findOneBy({ id: id });

        if (!data) throw new NotFoundException('El registro no existe');

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que crea un registro
    async createOne(dto: CreateDepartmentDto) {

        try{

            const department = this.departmentRepository.create(dto);
            const data = await this.departmentRepository.save(department);
            return {
                msg: 'Peticion correcta',
                data: data,
            };

        }catch(error){
            console.log(error.message)
        }
    }

    //Metodo que actualiza un registro especifico
    async updateOne(id: string, dto: UpdateDepartmentDto) {

        try{
            
            const department = await this.departmentRepository.findOneBy({ id: id });

            if (!department) throw new NotFoundException('El registro no existe');
    
            const updatedDepartment = Object.assign(department, dto);
            const data = await this.departmentRepository.save(updatedDepartment);
    
            return {
                msg: 'Peticion correcta',
                data: data,
            };
            
        }catch(error){
            console.log(error.message)
        }
    }

    //Metodo que elimina un registro especifico
    async deleteOne(id: string){
        const data = await this.departmentRepository.delete(id);
    
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que retorna la informacion de un departamento por su nombre
    async getOneByName(department_name: any){

        const data = await this.departmentRepository.findOne({ 
            where:{
                name: department_name.name
            } 
        })
        if(!data) throw new NotFoundException("El registro no existe.")

        return {
            msg: "Peticion correcta",
            data: data
        }
    }
}
