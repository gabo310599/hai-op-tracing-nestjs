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
    
            const process = new Process();
            process.request = request;
            process.department = department;
            
            if(dto.machine_id)
                process.machine = machine;
            
            if(dto.order_id)
                process.order = order;
            
            if(dto.operator_id)
                process.operator = operator;
            
            const data = await this.processRepository.save(process);
    
            return {
                msg: 'Peticion correcta',
                data: data,
            };
            
        }catch(error){
            console.log(error.message)
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

            if(dto.date_in)
                updatedProcess.date_in = new Date(dto.date_in);

            if(dto.operator_id)
                updatedProcess.operator = await this.operatorRepository.findOneBy({id: dto.operator_id})
    
            const data = await this.processRepository.save(updatedProcess);
    
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
        const data = await this.processRepository.delete(id);
    
        return {
            msg: "Peticion correcta",
            data: data
        }
    }

    //Metodo que retorna cuantos procesos activos hay por departamento
    async getProcessCountByDepartment(){

        const processes = await this.processRepository.find({
            relations:{
                request: true,
                department: true,
                operator: true,
                machine: true,
                order: true
            }
        });

        let dg = 0;
        let dt = 0;
        let gop = 0;
        let iop = 0;
        let t = 0;
        let e = 0;
        let c = 0;
        let cc = 0;
        let f = 0;
        let d = 0;

        processes.map(function(process){
            
            switch(process.department.name){
                
                case "Diseño Gráfico": {
                    if(process.date_in && !process.date_out)
                        dg++;
                    break;
                };

                case "Diseño Textil":{
                    if(process.date_in && !process.date_out)
                        dt++;
                    break;
                };

                case "Generar OP":{
                    if(process.date_in && !process.date_out)
                        gop++;
                    break;
                };

                case "Imprimir OP":{
                    if(process.date_in && !process.date_out)
                        iop++;
                    break;
                };

                case "Tejeduría": {
                    if(process.date_in && !process.date_out)
                        t++;
                    break;
                };

                case "Enrollado": {
                    if(process.date_in && !process.date_out)
                        e++;
                    break;
                };

                case "Corte": {
                    if(process.date_in && !process.date_out)
                        c++;
                    break;
                };

                case "Control de Calidad":{
                    if(process.date_in && !process.date_out)
                        cc++;
                    break;
                };

                case "Facturación":{
                    if(process.date_in && !process.date_out)
                        f++;
                    break;
                };

                case "Despacho":{
                    if(process.date_in && !process.date_out)
                        d++;
                    break;
                }
            }
        })

        return {
            msg: "Peticion correcta",
            data: {
                DG: dg,
                DT: dt,
                GOP: gop,
                IOP: iop,
                T: t,
                E: e,
                C: c,
                CC: cc,
                F: f,
                D: d
            }
        }
    }

    //Metodo que retorna que departamentos tienen al menos un pedido retrasado en proceso
    async getDepartmentsDelay(){

        const processes = await this.processRepository.find({
            relations:{
                request: true,
                department: true,
                operator: true,
                machine: true,
                order: true
            }
        });

        let dg = false;
        let dt = false;
        let gop = false;
        let iop = false;
        let t = false;
        let e = false;
        let c = false;
        let cc = false;
        let f = false;
        let d = false;

        processes.map(function(process){
            
            switch(process.department.name){
                
                case "Diseño Gráfico": {
                    
                    if(process.date_in){
                        const today = new Date();
                        const difference = today.getTime() - process.date_in.getTime();
                        const differenceInDays = difference / 1000 / 60 / 60 / 24;

                        if(differenceInDays > process.department.days_time_limit)
                            dg = true;
                    }
                    break;
                };

                case "Diseño Textil":{

                    if(process.date_in){
                        const today = new Date();
                        const difference = today.getTime() - process.date_in.getTime();
                        const differenceInDays = difference / 1000 / 60 / 60 / 24;

                        if(differenceInDays > process.department.days_time_limit)
                            dt = true;
                    }
                    break;
                };

                case "Generar OP":{
                    
                    if(process.date_in){
                        const today = new Date();
                        const difference = today.getTime() - process.date_in.getTime();
                        const differenceInDays = difference / 1000 / 60 / 60 / 24;

                        if(differenceInDays > process.department.days_time_limit)
                            gop = true;
                    }
                    break;

                };

                case "Imprimir OP":{

                    if(process.date_in){
                        const today = new Date();
                        const difference = today.getTime() - process.date_in.getTime();
                        const differenceInDays = difference / 1000 / 60 / 60 / 24;

                        if(differenceInDays > process.department.days_time_limit)
                            iop = true;
                    }
                    break;

                };

                case "Tejeduría": {
                    
                    if(process.date_in){
                        const today = new Date();
                        const difference = today.getTime() - process.date_in.getTime();
                        const differenceInDays = difference / 1000 / 60 / 60 / 24;

                        if(differenceInDays > process.department.days_time_limit)
                            t = true;
                    }
                    break;

                };

                case "Enrollado": {
                  
                    if(process.date_in){
                        const today = new Date();
                        const difference = today.getTime() - process.date_in.getTime();
                        const differenceInDays = difference / 1000 / 60 / 60 / 24;

                        if(differenceInDays > process.department.days_time_limit)
                            e = true;
                    }
                    break;

                };

                case "Corte": {
                    
                    if(process.date_in){
                        const today = new Date();
                        const difference = today.getTime() - process.date_in.getTime();
                        const differenceInDays = difference / 1000 / 60 / 60 / 24;

                        if(differenceInDays > process.department.days_time_limit)
                            c = true;
                    }
                    break;

                };

                case "Control de Calidad":{

                    if(process.date_in){
                        const today = new Date();
                        const difference = today.getTime() - process.date_in.getTime();
                        const differenceInDays = difference / 1000 / 60 / 60 / 24;

                        if(differenceInDays > process.department.days_time_limit)
                            cc = true;
                    }
                    break;

                };

                case "Facturación":{

                    if(process.date_in){
                        const today = new Date();
                        const difference = today.getTime() - process.date_in.getTime();
                        const differenceInDays = difference / 1000 / 60 / 60 / 24;

                        if(differenceInDays > process.department.days_time_limit)
                            f = true;
                    }
                    break;

                };

                case "Despacho":{

                    if(process.date_in){
                        const today = new Date();
                        const difference = today.getTime() - process.date_in.getTime();
                        const differenceInDays = difference / 1000 / 60 / 60 / 24;

                        if(differenceInDays > process.department.days_time_limit)
                            d = true;
                    }
                    break;

                }
            }
        })
        
        return {
            msg: "Peticion correcta",
            data: {
                DG: dg,
                DT: dt,
                GOP: gop,
                IOP: iop,
                T: t,
                E: e,
                C: c,
                CC: cc,
                F: f,
                D: d
            }
        }
    }

    //Metodo que retorna una lista de los procesos con retrasos por departamento
    async getListOfDelayProcess(){

        const processes = await this.processRepository.find({
            where:{
                date_out: null
            },
            relations:{
                request: true,
                department: true,
                order: true
            }
        });

        const data = []

        processes.map(function(process){
            
            const jsonBase = {
                id: null,
                department: null,
                order: null,
                request: null,
                delay: null
            }

            if(process.date_in){
                const today = new Date();
                const difference = today.getTime() - process.date_in.getTime();
                const differenceInDays = difference / 1000 / 60 / 60 / 24;

                if(differenceInDays > process.department.days_time_limit){
                    jsonBase.id = process.id;
                    jsonBase.department = process.department.name;
                    jsonBase.delay = differenceInDays - process.department.days_time_limit;
                    jsonBase.delay = jsonBase.delay.toFixed(2);
                    if(process.order)
                        jsonBase.order = process.order.op_number;
                    jsonBase.request = process.request.serial;
                    data.push(jsonBase)
                }
            }
        });

        const dg = [];
        const dt = [];
        const gop = [];
        const iop = [];
        const t = [];
        const e = [];
        const c = [];
        const cc = [];
        const f = [];
        const d = [];

        data.map(function(row){
            switch(row.department){
                case "Diseño Gráfico": {
                    dg.push(row);
                    break;
                };
                case "Diseño Textil":{
                    dt.push(row);
                    break;
                };
                case "Generar OP":{
                    gop.push(row);
                    break;
                };
                case "Imprimir OP":{
                    iop.push(row);
                    break;
                };
                case "Tejeduría": {
                    t.push(row);
                    break;
                };
                case "Enrollado": {
                    e.push(row);
                    break;
                };
                case "Corte": {
                    c.push(row);
                    break;
                };
                case "Control de Calidad":{
                    cc.push(row);
                    break;
                };
                case "Facturación":{
                    f.push(row);
                    break;
                };
                case "Despacho":{
                    d.push(row);
                    break;
                }
            }
        })

        return{
            msg: "Peticion correcta",
            data:{ 
                DG: dg,
                DT: dt,
                GOP: gop,
                IOP: iop,
                T: t,
                E: e,
                C: c,
                CC: cc,
                F: f,
                D: d
            }
            
        }
    }

    //Metodo que retorna la lista de procesos no activos de un departamento
    async getProcessByDepartment(department_id: string){
        
        const department = await this.departmentRepository.findOneBy({id: department_id});
    
        if(!department) throw new NotFoundException('El registro de departamento no exite.')
    
        const data = await this.processRepository.find({
            where:{
                department: department
            },
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

    //Metodo que retorna la lista de procesos en espera dentro de un departamento
    async getCheckInProcesses(department_id: string){

        const department = await this.departmentRepository.findOneBy({ id: department_id });

        if(!department) throw new NotFoundException("El registro de departamento no existe.")

        let data = await this.processRepository.find({
            where: {
                department: department,         
            },
            relations: {
                request: true,
                department: true,
                operator: true,
                machine: true,
                order: true
            }
        })

        for(let i = 0; i < data.length; i++){
            if(data[i].date_in)
                delete(data[i])
        }

        data = data.filter(function(x) {
            return x !== undefined;
        });
        
        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna la lista de procesos en espera dentro de un departamento
    async getCheckOutProcesses(department_id: string){

        const department = await this.departmentRepository.findOneBy({ id: department_id });

        if(!department) throw new NotFoundException("El registro de departamento no existe.")

        let data = await this.processRepository.find({
            where: {
                department: department,         
            },
            relations: {
                request: true,
                department: true,
                operator: true,
                machine: true,
                order: true
            }
        })

        for(let i = 0; i < data.length; i++){
            if(data[i].date_out || !data[i].date_in)
                delete(data[i])
        }

        data = data.filter(function(x) {
            return x !== undefined;
        });

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    }

    //Metodo que retorna una lista con los procesos activos sin OP en Generar OP
    async getRequestWithoutOpInGenerateOP(department_id: string){

        //Obtenemos la info del departamento
        const department = await this.departmentRepository.findOneBy({ id: department_id})

        if(!department) throw new NotFoundException("El registro de departamento no se encontro.");

        //Obtenemos la informacion de los procesos en el departamento
        let data = await this.processRepository.find({
            where:{
                department: department,
                order: null
            },
            relations: {
                department: true,
                order: true,
                request: true
            }
        })

        //Eliminamos los procesos que tengan fecha de salida, o alguna orden, o no tengan fecha de entrada.
        for(let i = 0; i < data.length; i++){
            if(data[i].date_out || !data[i].date_in)
                delete(data[i])
        }

        data = data.filter(function(x) {
            return x !== undefined;
        });

        return {
            msg: 'Peticion correcta',
            data: data,
        };
    } 

}
