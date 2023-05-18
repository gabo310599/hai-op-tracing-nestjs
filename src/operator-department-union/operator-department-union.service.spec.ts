/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorDepartmentUnionService } from './operator-department-union.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Operator } from '../operator/entities/operator.entity';
import { Department } from '../department/entities/department.entity';
import { OperatorDepartmentUnion } from './entities/operator-department-union.entity';

describe('OperatorDepartmentUnionService', () => {
  
  let service: OperatorDepartmentUnionService;
  const mockOperatorDepartmentUnionRepository = {};
  const mockOperatorRepository = {};
  const mockDepartmentRepository ={};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperatorDepartmentUnionService,
      {
        provide: getRepositoryToken(OperatorDepartmentUnion),
        useValue: mockOperatorDepartmentUnionRepository
      },
      {
        provide: getRepositoryToken(Operator),
        useValue: mockOperatorRepository
      },
      {
        provide: getRepositoryToken(Department),
        useValue: mockDepartmentRepository
      },
    ],
    }).compile();

    service = module.get<OperatorDepartmentUnionService>(OperatorDepartmentUnionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
