/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../department/entities/department.entity';
import { Machine } from '../machine/entities/machine.entity';
import { Operator } from '../operator/entities/operator.entity';
import { ProductionOrder } from '../production-order/entities/production-order.entity';
import { RequestNote } from '../request-note/entities/request-note.entity';
import { Repository } from 'typeorm';
import { CreateProcessDto } from './dtos/create-process.dto';
import { UpdateProcessDto } from './dtos/update-process.dto';
import { Process } from './entities/process.entity';
import { Between } from 'typeorm';

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
    private readonly orderRepository: Repository<ProductionOrder>,
  ) {}

  //Metodo que retorna todos los registros
  async getAll() {
    const data = await this.processRepository.find({
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que retorna un registro especifico
  async getOne(id: string) {
    const data = await this.processRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    if (!data) throw new NotFoundException('El registro no existe');

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que crea un registro
  async createOne(dto: CreateProcessDto) {
    try {
      const request = await this.requestRepository.findOneBy({
        id: dto.request_id,
      });
      const department = await this.departmentRepository.findOneBy({
        id: dto.department_id,
      });
      const operator = await this.operatorRepository.findOneBy({
        id: dto.operator_id,
      });
      const machine = await this.machineRepository.findOneBy({
        id: dto.machine_id,
      });
      const order = await this.orderRepository.findOneBy({ id: dto.order_id });

      if (!request)
        throw new NotFoundException('El registro de pedido no existe');
      if (!department)
        throw new NotFoundException('El registro de departamento no existe');

      const process = new Process();
      process.request = request;
      process.department = department;

      if (dto.machine_id) process.machine = machine;

      if (dto.order_id) process.order = order;

      if (dto.operator_id) process.operator = operator;

      const data = await this.processRepository.save(process);

      return {
        msg: 'Peticion correcta',
        data: data,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  //Metodo que actualiza un registro especifico
  async updateOne(id: string, dto: UpdateProcessDto) {
    try {
      const process = await this.processRepository.findOneBy({ id: id });

      if (!process) throw new NotFoundException('El registro no existe');

      const updatedProcess = process;

      if (dto.machine_id)
        updatedProcess.machine = await this.machineRepository.findOneBy({
          id: dto.machine_id,
        });

      if (dto.order_id)
        updatedProcess.order = await this.orderRepository.findOneBy({
          id: dto.order_id,
        });

      if (dto.date_out) {
        updatedProcess.date_out = new Date(dto.date_out);
        const difference =
          updatedProcess.date_out.getTime() - process.date_in.getTime();
        updatedProcess.hours_in = difference / 1000 / 60 / 60;
      }

      if (dto.date_in) updatedProcess.date_in = new Date(dto.date_in);

      if (dto.operator_id)
        updatedProcess.operator = await this.operatorRepository.findOneBy({
          id: dto.operator_id,
        });

      if (dto.observation) updatedProcess.observation = dto.observation;

      const data = await this.processRepository.save(updatedProcess);

      return {
        msg: 'Peticion correcta',
        data: data,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  //Metodo que elimina un registro especifico
  async deleteOne(id: string) {
    const data = await this.processRepository.delete(id);

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que elimina todos los procesos asociados a un pedido.
  async deleteRequestProcesses(request_id: string){

    const processes = await this.processRepository.find({
      relations:{
        request: true,
      }
    })

    if(!processes) throw new NotFoundException("No hay procesos en registro.")

    const request_processes_list = [];

    for( let i = 0; i < processes.length; i++ ){
      if(processes[i].request.id === request_id){
        request_processes_list.push(processes[i])
      }
    }

    if( request_processes_list.length <= 0 ) throw new NotFoundException("No existen procesos asociados al pedido")
    
    const data = []

    for( let i = 0; i < request_processes_list.length; i++){
      data.push(await this.processRepository.delete(request_processes_list[i].id))
    }

    return {
      msg: 'Peticion correcta',
      data: data,
    };

  }

  //Metodo que retorna cuantos procesos activos hay por departamento
  async getProcessCountByDepartment() {
    const processes = await this.processRepository.find({
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
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

    processes.map(function (process) {
      switch (process.department.name) {
        case 'Diseño Gráfico': {
          if (process.date_in && !process.date_out) dg++;
          break;
        }

        case 'Diseño Textil': {
          if (process.date_in && !process.date_out) dt++;
          break;
        }

        case 'Generar OP': {
          if (process.date_in && !process.date_out) gop++;
          break;
        }

        case 'Imprimir OP': {
          if (process.date_in && !process.date_out) iop++;
          break;
        }

        case 'Tejeduría': {
          if (process.date_in && !process.date_out) t++;
          break;
        }

        case 'Enrollado': {
          if (process.date_in && !process.date_out) e++;
          break;
        }

        case 'Corte': {
          if (process.date_in && !process.date_out) c++;
          break;
        }

        case 'Control de Calidad': {
          if (process.date_in && !process.date_out) cc++;
          break;
        }

        case 'Facturación': {
          if (process.date_in && !process.date_out) f++;
          break;
        }

        case 'Despacho': {
          if (process.date_in && !process.date_out) d++;
          break;
        }
      }
    });

    return {
      msg: 'Peticion correcta',
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
        D: d,
      },
    };
  }

  //Metodo que retorna que departamentos tienen al menos un pedido retrasado en proceso
  async getDepartmentsDelay() {
    const processes = await this.processRepository.find({
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
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

    processes.map(function (process) {
      switch (process.department.name) {
        case 'Diseño Gráfico': {
          if (process.date_in && !process.date_out) {
            const today = new Date();
            const difference = today.getTime() - process.date_in.getTime();
            const differenceInDays = difference / 1000 / 60 / 60 / 24;

            if (differenceInDays > process.department.days_time_limit)
              dg = true;
          }
          break;
        }

        case 'Diseño Textil': {
          if (process.date_in && !process.date_out) {
            const today = new Date();
            const difference = today.getTime() - process.date_in.getTime();
            const differenceInDays = difference / 1000 / 60 / 60 / 24;

            if (differenceInDays > process.department.days_time_limit)
              dt = true;
          }
          break;
        }

        case 'Generar OP': {
          if (process.date_in && !process.date_out) {
            const today = new Date();
            const difference = today.getTime() - process.date_in.getTime();
            const differenceInDays = difference / 1000 / 60 / 60 / 24;

            if (differenceInDays > process.department.days_time_limit)
              gop = true;
          }
          break;
        }

        case 'Imprimir OP': {
          if (process.date_in && !process.date_out) {
            const today = new Date();
            const difference = today.getTime() - process.date_in.getTime();
            const differenceInDays = difference / 1000 / 60 / 60 / 24;

            if (differenceInDays > process.department.days_time_limit)
              iop = true;
          }
          break;
        }

        case 'Tejeduría': {
          if (process.date_in && !process.date_out) {
            const today = new Date();
            const difference = today.getTime() - process.date_in.getTime();
            const differenceInDays = difference / 1000 / 60 / 60 / 24;

            if (differenceInDays > process.department.days_time_limit) t = true;
          }
          break;
        }

        case 'Enrollado': {
          if (process.date_in && !process.date_out) {
            const today = new Date();
            const difference = today.getTime() - process.date_in.getTime();
            const differenceInDays = difference / 1000 / 60 / 60 / 24;

            if (differenceInDays > process.department.days_time_limit) e = true;
          }
          break;
        }

        case 'Corte': {
          if (process.date_in && !process.date_out) {
            const today = new Date();
            const difference = today.getTime() - process.date_in.getTime();
            const differenceInDays = difference / 1000 / 60 / 60 / 24;

            if (differenceInDays > process.department.days_time_limit) c = true;
          }
          break;
        }

        case 'Control de Calidad': {
          if (process.date_in && !process.date_out) {
            const today = new Date();
            const difference = today.getTime() - process.date_in.getTime();
            const differenceInDays = difference / 1000 / 60 / 60 / 24;

            if (differenceInDays > process.department.days_time_limit)
              cc = true;
          }
          break;
        }

        case 'Facturación': {
          if (process.date_in && !process.date_out) {
            const today = new Date();
            const difference = today.getTime() - process.date_in.getTime();
            const differenceInDays = difference / 1000 / 60 / 60 / 24;

            if (differenceInDays > process.department.days_time_limit) f = true;
          }
          break;
        }

        case 'Despacho': {
          if (process.date_in && !process.date_out) {
            const today = new Date();
            const difference = today.getTime() - process.date_in.getTime();
            const differenceInDays = difference / 1000 / 60 / 60 / 24;

            if (differenceInDays > process.department.days_time_limit) d = true;
          }
          break;
        }
      }
    });

    return {
      msg: 'Peticion correcta',
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
        D: d,
      },
    };
  }

  //Metodo que retorna una lista de los procesos con retrasos por departamento
  async getListOfDelayProcess() {
    const processes = await this.processRepository.find({
      where: {
        date_out: null,
      },
      relations: {
        request: true,
        department: true,
        order: true,
      },
    });

    const data = [];

    processes.map(function (process) {
      const jsonBase = {
        id: null,
        department: null,
        order: null,
        request: null,
        delay: null,
      };

      if (process.date_in && !process.date_out) {
        const today = new Date();
        const difference = today.getTime() - process.date_in.getTime();
        const differenceInDays = difference / 1000 / 60 / 60 / 24;

        if (differenceInDays > process.department.days_time_limit) {
          jsonBase.id = process.id;
          jsonBase.department = process.department.name;
          jsonBase.delay =
            differenceInDays - process.department.days_time_limit;
          jsonBase.delay = jsonBase.delay.toFixed(2);
          if (process.order) jsonBase.order = process.order.op_number;
          jsonBase.request =
            process.request.serial + process.request.characters;
          data.push(jsonBase);
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

    data.map(function (row) {
      switch (row.department) {
        case 'Diseño Gráfico': {
          dg.push(row);
          break;
        }
        case 'Diseño Textil': {
          dt.push(row);
          break;
        }
        case 'Generar OP': {
          gop.push(row);
          break;
        }
        case 'Imprimir OP': {
          iop.push(row);
          break;
        }
        case 'Tejeduría': {
          t.push(row);
          break;
        }
        case 'Enrollado': {
          e.push(row);
          break;
        }
        case 'Corte': {
          c.push(row);
          break;
        }
        case 'Control de Calidad': {
          cc.push(row);
          break;
        }
        case 'Facturación': {
          f.push(row);
          break;
        }
        case 'Despacho': {
          d.push(row);
          break;
        }
      }
    });

    return {
      msg: 'Peticion correcta',
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
        D: d,
      },
    };
  }

  //Metodo que retorna la lista de procesos activos de un departamento
  async getProcessByDepartment(department_id: string) {
    const department = await this.departmentRepository.findOneBy({
      id: department_id,
    });

    if (!department)
      throw new NotFoundException('El registro de departamento no exite.');

    let data = await this.processRepository.find({
      where: {
        department: department,
      },
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (!data[i].date_out && !data[i].date_in) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que retorna la lista de procesos en espera dentro de un departamento
  async getCheckInProcesses(department_id: string) {
    const department = await this.departmentRepository.findOneBy({
      id: department_id,
    });

    if (!department)
      throw new NotFoundException('El registro de departamento no existe.');

    let data = await this.processRepository.find({
      where: {
        department: department,
      },
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (data[i].date_in) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que retorna la lista de procesos activos dentro de un departamento
  async getCheckOutProcesses(department_id: string) {
    const department = await this.departmentRepository.findOneBy({
      id: department_id,
    });

    if (!department)
      throw new NotFoundException('El registro de departamento no existe.');

    let data = await this.processRepository.find({
      where: {
        department: department,
      },
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (data[i].date_out || !data[i].date_in) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que retorna una lista con los procesos activos sin OP en Generar OP
  async getRequestWithoutOpInGenerateOP(department_id: string) {
    //Obtenemos la info del departamento
    const department = await this.departmentRepository.findOneBy({
      id: department_id,
    });

    if (!department)
      throw new NotFoundException(
        'El registro de departamento no se encontro.',
      );

    //Obtenemos la informacion de los procesos en el departamento
    let data = await this.processRepository.find({
      where: {
        department: department,
        order: null,
      },
      relations: {
        department: true,
        order: true,
        request: true,
      },
    });

    //Eliminamos los procesos que tengan fecha de salida, o alguna orden, o no tengan fecha de entrada.
    for (let i = 0; i < data.length; i++) {
      if (data[i].date_out || !data[i].date_in) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que retorna la lista de procesos activos dentro de un departamento que no esten asociados a una maquina.
  async getProcessWithoutMachines(department_id: string) {
    const department = await this.departmentRepository.findOneBy({
      id: department_id,
    });

    if (!department)
      throw new NotFoundException('El registro de departamento no existe.');

    let data = await this.processRepository.find({
      where: {
        department: department,
      },
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (data[i].date_out || data[i].date_in || data[i].machine)
        delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que retorna lista de procesos completados de un departamento.
  async getCompleteProcessesByDepartment(department_id: string) {
    const department = await this.departmentRepository.findOneBy({
      id: department_id,
    });

    if (!department)
      throw new NotFoundException('El registro de departamento no existe.');

    let data = await this.processRepository.find({
      where: {
        department: department,
      },
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (!data[i].date_out || !data[i].date_in || data[i].observation)
        delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que retorna lista de procesos que se encuentren en una maquina especifica
  async getProcessesInMachine(machine_id: string) {
    const machine = await this.machineRepository.findOneBy({ id: machine_id });

    if (!machine)
      throw new NotFoundException('No se encontro el registro de la maquina');

    let data = await this.processRepository.find({
      where: {
        machine: machine,
      },
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (data[i].date_out || !data[i].date_in) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que devuelve una lista de pedidos con su ultimo proceso activo
  async getLastActiveProcesses() {
    let data = await this.processRepository.find({
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (data[i].date_out) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que retorna los procesos de un pedido especifico para la linea de tiempo
  async getProcessForTimeLine(process_id: string) {
    const process = await this.processRepository.findOne({
      where: {
        id: process_id,
      },
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    if (!process)
      throw new NotFoundException('No se encontro el registro de proceso.');

    let data = [];

    if (!process.order) {
      const processesByRequest = await this.processRepository.find({
        where: {
          request: process.request,
        },
        relations: {
          request: true,
          department: true,
          operator: true,
          machine: true,
          order: true,
        },
      });

      if (!processesByRequest)
        throw new NotFoundException(
          'No se encontraron registros con ese pedido',
        );

      data = processesByRequest;
    } else {
      const processesByRequest = await this.processRepository.find({
        where: {
          request: process.request,
        },
        relations: {
          request: true,
          department: true,
          operator: true,
          machine: true,
          order: true,
        },
      });

      if (!processesByRequest)
        throw new NotFoundException(
          'No se encontraron registros con ese pedido',
        );

      data = processesByRequest;

      for (let i = 0; i < data.length; i++) {
        if (data[i].order)
          if (
            data[i].order.id != process.order.id &&
            data[i].department.name != 'Generar OP'
          )
            delete data[i];
      }

      data = data.filter(function (x) {
        return x !== undefined;
      });
    }

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que devuelve la lista de procesos del historial
  async getHistory() {
    const department = await this.departmentRepository.findOne({
      where: {
        name: 'Despacho',
      },
    });

    if (!department)
      throw new NotFoundException(
        'No se encontro el registro del departamento.',
      );

    let data = await this.processRepository.find({
      where: {
        department: department,
      },
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (!data[i].date_in || !data[i].date_out) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que devuelve todos los procesos que tengan alguna observacion
  async getByObservation() {
    let data = await this.processRepository.find({
      relations: {
        request: true,
        department: true,
        operator: true,
        machine: true,
        order: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (!data[i].observation) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que devuelve los pedidos que aun no entren a ningun departamento
  async getRequestWithoutCheckIn() {
    const department = await this.departmentRepository.findOne({
      where: {
        process_turn: 1,
      },
    });

    if (!department)
      throw new NotFoundException('El registro de departamento no existe.');

    let data = await this.processRepository.find({
      where: {
        department: department,
      },
      relations: {
        request: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (data[i].date_in || data[i].date_out) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que devuelve las ordenes que aun no entren a ningun departamento
  async getOrderWithoutCheckIn() {
    const department = await this.departmentRepository.findOne({
      where: {
        process_turn: 4,
      },
    });

    if (!department)
      throw new NotFoundException('El registro de departamento no existe.');

    let data = await this.processRepository.find({
      where: {
        department: department,
      },
      relations: {
        order: true,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (data[i].date_in || data[i].date_out) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que calcula la cantidad de pedidos nuevos que hay en el sistema
  async getNewRequestCount() {
    const department = await this.departmentRepository.findOne({
      where: {
        name: 'Diseño Gráfico',
      },
    });

    if (!department)
      throw new NotFoundException(
        'No se encuentra el registro de departamento.',
      );

    let data = await this.processRepository.find({
      where: {
        department: department,
      },
    });

    for (let i = 0; i < data.length; i++) {
      if (data[i].date_in || data[i].date_out) delete data[i];
    }

    data = data.filter(function (x) {
      return x !== undefined;
    });

    let requestCount = 0;

    data.map(function () {
      requestCount++;
    });

    return {
      msg: 'Peticion correcta',
      data: requestCount,
    };
  }

  //Metodo que obtiene los pedidos antes de entrar a tejeduria
  async getRequestBeforeWeaving() {
    const departments = await this.departmentRepository.find({
      where: {
        process_turn: Between(1, 5),
      },
    });

    if (!departments)
      throw new NotFoundException('No se encontraron los departamentos.');

    //Diseno grafico
    let graphicDesignProcesses = await this.processRepository.find({
      where: {
        department: departments[0],
      },
      relations: {
        department: true,
        request: true,
      },
    });

    for (let i = 0; i < graphicDesignProcesses.length; i++) {
      if (graphicDesignProcesses[i].date_out) delete graphicDesignProcesses[i];
    }

    graphicDesignProcesses = graphicDesignProcesses.filter(function (x) {
      return x !== undefined;
    });

    //Diseno textil
    let textileDesignProcesses = await this.processRepository.find({
      where: {
        department: departments[1],
      },
      relations: {
        department: true,
        request: true,
      },
    });

    for (let i = 0; i < textileDesignProcesses.length; i++) {
      if (textileDesignProcesses[i].date_out) delete textileDesignProcesses[i];
    }

    textileDesignProcesses = textileDesignProcesses.filter(function (x) {
      return x !== undefined;
    });

    //Generar OP
    let generateOPProcesses = await this.processRepository.find({
      where: {
        department: departments[2],
      },
      relations: {
        department: true,
        request: true,
      },
    });

    for (let i = 0; i < generateOPProcesses.length; i++) {
      if (generateOPProcesses[i].date_out) delete generateOPProcesses[i];
    }

    generateOPProcesses = generateOPProcesses.filter(function (x) {
      return x !== undefined;
    });

    //Imprimir OP
    let printOPProcesses = await this.processRepository.find({
      where: {
        department: departments[3],
      },
      relations: {
        department: true,
        request: true,
      },
    });

    for (let i = 0; i < printOPProcesses.length; i++) {
      if (printOPProcesses[i].date_out) delete printOPProcesses[i];
    }

    printOPProcesses = printOPProcesses.filter(function (x) {
      return x !== undefined;
    });

    //Tejeduria
    let weavingProcesses = await this.processRepository.find({
      where: {
        department: departments[4],
      },
      relations: {
        department: true,
        request: true,
      },
    });

    for (let i = 0; i < weavingProcesses.length; i++) {
      if (weavingProcesses[i].date_out || weavingProcesses[i].date_in)
        delete weavingProcesses[i];
    }

    weavingProcesses = weavingProcesses.filter(function (x) {
      return x !== undefined;
    });

    const data = [];

    for (let i = 0; i < graphicDesignProcesses.length; i++)
      data.push(graphicDesignProcesses[i]);

    for (let i = 0; i < textileDesignProcesses.length; i++)
      data.push(textileDesignProcesses[i]);

    for (let i = 0; i < generateOPProcesses.length; i++)
      data.push(generateOPProcesses[i]);

    for (let i = 0; i < printOPProcesses.length; i++)
      data.push(printOPProcesses[i]);

    for (let i = 0; i < weavingProcesses.length; i++)
      data.push(weavingProcesses[i]);

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que obtiene las ordens antes de entrar a tejeduria
  async getOrderBeforeWeaving() {
    const departments = await this.departmentRepository.find({
      where: {
        process_turn: Between(4,5)
      },
    });

    if (!departments)
      throw new NotFoundException('No se encontraron los departamentos.');

    //Imprimir OP
    let printOPProcesses = await this.processRepository.find({
      where: {
        department: departments[0],
      },
      relations: {
        department: true,
        request: true,
        order: true
      },
    });

    for (let i = 0; i < printOPProcesses.length; i++) {
      if (printOPProcesses[i].date_out) delete printOPProcesses[i];
    }

    printOPProcesses = printOPProcesses.filter(function (x) {
      return x !== undefined;
    });

    //Tejeduria
    let weavingProcesses = await this.processRepository.find({
      where: {
        department: departments[1],
      },
      relations: {
        department: true,
        request: true,
        order: true
      },
    });

    for (let i = 0; i < weavingProcesses.length; i++) {
      if (weavingProcesses[i].date_out || weavingProcesses[i].date_in)
        delete weavingProcesses[i];
    }

    weavingProcesses = weavingProcesses.filter(function (x) {
      return x !== undefined;
    });

    const data = [];

    for (let i = 0; i < printOPProcesses.length; i++)
      data.push(printOPProcesses[i]);

    for (let i = 0; i < weavingProcesses.length; i++)
      data.push(weavingProcesses[i]);

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }
}
