/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProcessService } from './process.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Process } from './entities/process.entity';
import { RequestNote } from '../request-note/entities/request-note.entity';
import { Department } from '../department/entities/department.entity';
import { Machine } from '../machine/entities/machine.entity';
import { ProductionOrder } from '../production-order/entities/production-order.entity';
import { Operator } from '../operator/entities/operator.entity';

describe('ProcessService', () => {
  let service: ProcessService;

  const mockProcessRepository = {
    //save
    save: jest.fn((process) => {
      if (!process.id)
        return {
          id: 'create',
          ...process,
        };
      else
        return {
          ...process,
        };
    }),

    //delete
    delete: jest.fn((data) => {
      return data;
    }),

    //findOne
    findOne: jest.fn((data) => {
      if (data.where.id === 'read')
        return {
          id: data.where.id,
          request: new RequestNote(),
          department: new Department(),
          operator: new Operator(),
          machine: new Machine(new Department()),
          order: new ProductionOrder(new RequestNote()),
        };
    }),

    //findOneBy
    findOneBy: jest.fn((data) => {
      if (data.id === 'update')
        return {
          id: data.id,
          observation: 'n/a',
        };
    }),
  };

  const mockRequestNoteRepository = {
    //findOneBy
    findOneBy: jest.fn(() => {
      return new RequestNote();
    }),
  };

  const mockDepartmentRepository = {
    //findOneBy
    findOneBy: jest.fn(() => {
      return new Department();
    }),
  };

  const mockOperatorRepository = {
    //findOneBy
    findOneBy: jest.fn(() => {
      return new Operator();
    }),
  };

  const mockMachineRepository = {
    //findOneBy
    findOneBy: jest.fn(() => {
      return new Machine(new Department());
    }),
  };

  const mockProductionOrderRepository = {
    //findOneBy
    findOneBy: jest.fn(() => {
      return new ProductionOrder(new RequestNote());
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessService,
        {
          provide: getRepositoryToken(Process),
          useValue: mockProcessRepository,
        },
        {
          provide: getRepositoryToken(RequestNote),
          useValue: mockRequestNoteRepository,
        },
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository,
        },
        {
          provide: getRepositoryToken(Operator),
          useValue: mockOperatorRepository,
        },
        {
          provide: getRepositoryToken(Machine),
          useValue: mockMachineRepository,
        },
        {
          provide: getRepositoryToken(ProductionOrder),
          useValue: mockProductionOrderRepository,
        },
      ],
    }).compile();

    service = module.get<ProcessService>(ProcessService);
  });

  //Test unitario por defecto
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que crea un proceso
  it('should create a process', async () => {
    const dto = {
      request_id: 'request_id',
      department_id: 'department_id',
      operator_id: 'operator_id',
      machine_id: 'machine_id',
      order_id: 'order_id',
      date_in: 'date_in',
      date_out: 'date_out',
    };

    expect(await service.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'create',
        request: expect.any(RequestNote),
        department: expect.any(Department),
        operator: expect.any(Operator),
        machine: expect.any(Machine),
        order: expect.any(ProductionOrder),
      },
    });
  });

  //Test unitario que lee un proceso
  it('should read a process', async () => {
    expect(await service.getOne('read')).toEqual({
      msg: expect.any(String),
      data: {
        id: 'read',
        request: expect.any(RequestNote),
        department: expect.any(Department),
        operator: expect.any(Operator),
        machine: expect.any(Machine),
        order: expect.any(ProductionOrder),
      },
    });
  });

  //Test unitario que actualiza un proceso
  it('should update a process', async () => {
    const dto = {
      observation: 'observation',
    };

    expect(await service.updateOne('update', dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'update',
        observation: 'observation',
      },
    });
  });

  //Test unitario que elimina un proceso
  it('should delete a process', async () => {
    expect(await service.deleteOne('delete')).toEqual({
      msg: expect.any(String),
      data: 'delete',
    });
  });
});
