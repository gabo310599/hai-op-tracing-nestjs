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
  const mockProcessRepository = {};
  const mockRequestNoteRepository = {};
  const mockDepartmentRepository = {};
  const mockOperatorRepository = {};
  const mockMachineRepository = {};
  const mockProductionOrderRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessService,
        {
          provide: getRepositoryToken(Process),
          useValue: mockProcessRepository
        },
        {
          provide: getRepositoryToken(RequestNote),
          useValue: mockRequestNoteRepository
        },
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository
        },
        {
          provide: getRepositoryToken(Operator),
          useValue: mockOperatorRepository
        },
        {
          provide: getRepositoryToken(Machine),
          useValue: mockMachineRepository
        },
        {
          provide: getRepositoryToken(ProductionOrder),
          useValue: mockProductionOrderRepository
        },
      ],
    }).compile();

    service = module.get<ProcessService>(ProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
