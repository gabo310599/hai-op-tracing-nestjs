/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MachineService } from './machine.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { Department } from '../department/entities/department.entity';

describe('MachineService', () => {
  
  let service: MachineService;
  const mockMachineRepository = {};
  const mockDepartmentRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachineService, 
        {
          provide: getRepositoryToken(Machine),
          useValue: mockMachineRepository
        },
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository
        },
      ],
    }).compile();

    service = module.get<MachineService>(MachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
