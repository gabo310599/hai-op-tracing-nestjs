/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorService } from './operator.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Operator } from './entities/operator.entity';

describe('OperatorService', () => {
  
  let service: OperatorService;
  const mockOperatorRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperatorService,
        {
          provide: getRepositoryToken(Operator),
          useValue: mockOperatorRepository
        }
      ],
    }).compile();

    service = module.get<OperatorService>(OperatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
