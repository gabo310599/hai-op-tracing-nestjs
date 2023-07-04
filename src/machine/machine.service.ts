/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../department/entities/department.entity';
import { Repository } from 'typeorm';
import { CreateMachineDto } from './dtos/create-machine.dto';
import { UpdateMachineDto } from './dtos/update-machine.dto';
import { Machine } from './entities/machine.entity';
import { WarpedEnum } from 'src/production-order/enums/warped.enum';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  //Metodo que retorna todos los registros
  async getAll() {
    const data = await this.machineRepository.find({
      relations: {
        department: true,
      },
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que retorna un registro especifico
  async getOne(id: string) {
    const data = await this.machineRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        department: true,
      },
    });

    if (!data) throw new NotFoundException('El registro no existe');

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que crea un registro
  async createOne(dto: CreateMachineDto) {
    try {
      const department = await this.departmentRepository.findOneBy({
        id: dto.department_id,
      });

      if (!department)
        throw new NotFoundException('El registro de departamento no existe');

      const machine = new Machine(department);
      machine.brand = dto.brand;
      machine.model = dto.model;
      machine.area = dto.area;
      machine.number = dto.number;
      machine.warped_color = dto.warped_color;

      const data = await this.machineRepository.save(machine);

      return {
        msg: 'Peticion correcta',
        data: data,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  //Metodo que actualiza un registro especifico
  async updateOne(id: string, dto: UpdateMachineDto) {
    try {
      const machine = await this.machineRepository.findOneBy({ id: id });

      if (!machine)
        throw new NotFoundException('El registro de maquina no existe');

      const updatedMachine = Object.assign(machine, dto);

      if (dto.department_id)
        updatedMachine.department = await this.departmentRepository.findOneBy({
          id: dto.department_id,
        });

      if (!updatedMachine.department && dto.department_id)
        throw new NotFoundException('El registro de departamento no existe');

      const data = await this.machineRepository.save(updatedMachine);

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
    const data = await this.machineRepository.delete(id);

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que devuelve las maquinas asociadas a un departamento especifico
  async getMachinesByDepartment(department_id: string) {
    const department = await this.departmentRepository.findOne({
      where: {
        id: department_id,
      },
    });

    if (!department)
      throw new NotFoundException(
        'El registro de departamento no se encontro.',
      );

    const data = await this.machineRepository.find({
      where: {
        department: department,
      },
      relations: {
        department: true,
      },
    });

    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }

  //Metodo que devuelve las maquinas asociadas a un urdido de tejeduria especifico
  async getMachinesByWarped(warped_color: WarpedEnum) {
    
    const data = await this.machineRepository.find({
      where: {
        warped_color: warped_color,
      },
    });

    if(!data) throw new NotFoundException("No se encuentra la maquina registrada.")
    
    return {
      msg: 'Peticion correcta',
      data: data,
    };
  }
}
