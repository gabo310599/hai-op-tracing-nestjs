/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { ProductionOrder } from 'src/production-order/entities/production-order.entity';
import { RequestNote } from 'src/request-note/entities/request-note.entity';
import { Repository } from 'typeorm';
import { CreateProcessDto } from './dtos/create-process.dto';
import { UpdateProcessDto } from './dtos/update-process.dto';
import { Process } from './entities/process.entity';

@Injectable()
export class ProcessService {

    constructor(

        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,

        @InjectRepository(RequestNote)
        private readonly requestRepository: Repository<RequestNote>,

        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,

        @InjectRepository(Operator)
        private readonly operatorRepository: Repository<Operator>,

        @InjectRepository(Machine)
        private readonly machineRepository: Repository<Machine>,

        @InjectRepository(ProductionOrder)
        private readonly orderRepository: Repository<ProductionOrder>

    ) {}

    //Metodo que retorna todos los registros
    async getAll(){
        
        const data = await this.processRepository.find({
            relations:{
                request: true,
                department: true,
                operator: true,
                machine: true,
                order: true
            }
        });

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna un registro especifico
    async getOne(id: string) {
        const data = await this.processRepository.findOne({ 
            where:{
                id: id 
            },
            relations:{
                request: true,
                department: true,
                operator: true,
                machine: true,
                order: true
            }
        });

        if (!data) throw new NotFoundException('El registro no existe');

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que crea un registro
    async createOne(dto: CreateProcessDto){

        try{

            const request = await this.requestRepository.findOneBy({id: dto.request_id})
            const department = await this.departmentRepository.findOneBy({id: dto.department_id});
            const operator = await this.operatorRepository.findOneBy({id: dto.operator_id});
            const machine = await this.machineRepository.findOneBy({id: dto.machine_id});
            const order = await this.orderRepository.findOneBy({id: dto.order_id});
    
            if(!request) throw new NotFoundException("El registro de pedido no existe"); 
            if(!department) throw new NotFoundException("El registro de departamento no existe");
            if(!operator) throw new NotFoundException("El registro de operador no existe");
    
            const process = new Process();
            process.request = request;
            process.department = department;
            process.operator = operator;
            process.date_in = new Date(dto.date_in);
            
            if(dto.machine_id)
                process.machine = machine;
            
            if(dto.order_id)
                process.order = order;
            
            const data = await this.processRepository.save(process);
    
            return {
                msg: 'Peticion correcta',
                data: data,
            };
            
        }catch(error){
            console.log(error)
        }
     

    }

    //Metodo que actualiza un registro especifico
    async updateOne(id: string, dto: UpdateProcessDto) {

        try{

            const process = await this.processRepository.findOneBy({ id: id });

            if (!process) throw new NotFoundException('El registro no existe');
    
            const updatedProcess = process;
    
            if(dto.machine_id)
                updatedProcess.machine = await this.machineRepository.findOneBy({id: dto.machine_id});
            
            if(dto.order_id)
                updatedProcess.order = await this.orderRepository.findOneBy({id: dto.order_id});
    
            if(dto.date_out){
                updatedProcess.date_out = new Date(dto.date_out);
                const difference = updatedProcess.date_out.getTime() - process.date_in.getTime();
                updatedProcess.hours_in = difference / 1000 / 60 / 60; 
            }
    
            const data = await this.processRepository.save(updatedProcess);
    
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
        const data = await this.processRepository.delete(id);
    
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

}
