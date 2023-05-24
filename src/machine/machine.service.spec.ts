/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MachineService } from './machine.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { Department } from '../department/entities/department.entity';
import { AreaEnum } from './enums/area.enum';

describe('MachineService', () => {
  let service: MachineService;
  const mockMachineRepository = {
    //save
    save: jest.fn((machine) => {
      return {
        id: 'create',
        ...machine,
      };
    }),

    //findOne
    findOne: jest.fn((data) => {
      if (data.where.id === 'read') {
        return {
          id: data.where.id,
          brand: 'brand',
          model: 'model',
          number: 'number',
          area: AreaEnum.ETIQUETAS,
          department: new Department(),
          total_white_hours: 0,
          total_black_hours: 0,
          total_points: 0,
        };
      }
    }),

    //findOneBy
    findOneBy: jest.fn((data) => {
      if (data.id === 'update') {
        return {
          ...data,
          department: new Department(),
        };
      }
    }),

    //delete
    delete: jest.fn((data) => {
      return data;
    }),
  };

  const mockDepartmentRepository = {
    //findOneBy
    findOneBy: jest.fn(() => {
      return new Department();
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MachineService,
        {
          provide: getRepositoryToken(Machine),
          useValue: mockMachineRepository,
        },
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository,
        },
      ],
    }).compile();

    service = module.get<MachineService>(MachineService);
  });

  //Test unitario por defecto
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que crea y devuelve una maquina
  it('should create a machine', async () => {
    const dto = {
      brand: 'brand',
      model: 'model',
      number: 'number',
      area: AreaEnum.ETIQUETAS,
      department_id: 'department_id',
      total_white_hours: 0,
      total_black_hours: 0,
      total_points: 0,
    };

    expect(await service.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'create',
        brand: 'brand',
        model: 'model',
        number: 'number',
        area: AreaEnum.ETIQUETAS,
        department: expect.any(Department),
      },
    });
  });

  //Test unitario que lee una maquina
  it('should read a machine', async () => {
    expect(await service.getOne('read')).toEqual({
      msg: expect.any(String),
      data: {
        id: 'read',
        brand: 'brand',
        model: 'model',
        number: 'number',
        area: AreaEnum.ETIQUETAS,
        department: expect.any(Department),
        total_white_hours: 0,
        total_black_hours: 0,
        total_points: 0,
      },
    });
  });

  //Test unitario que actualiza una maquina
  it('should update a machine', async () => {
    const dto = {
      brand: 'updated_brand',
      model: 'updated_model',
      number: 'updated_number',
      area: AreaEnum.CINTAS,
      total_white_hours: 1,
      total_black_hours: 1,
      total_points: 1,
    };

    expect(await service.updateOne('update', dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'update',
        brand: 'updated_brand',
        model: 'updated_model',
        number: 'updated_number',
        area: AreaEnum.CINTAS,
        department: expect.any(Department),
        total_white_hours: 1,
        total_black_hours: 1,
        total_points: 1,
      },
    });
  });

  //Test unitario que elimina una maquina
  it('should delete a machine', async () => {
    expect(await service.deleteOne('delete')).toEqual({
      msg: expect.any(String),
      data: 'delete',
    });
  });
  
});
