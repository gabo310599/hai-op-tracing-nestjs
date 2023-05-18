/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from './log.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Log } from './entities/log.entity';

describe('LogService', () => {
  
  let service: LogService;
  const mockLogRepository = {};
  const mockUserRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogService, 
        {
          provide: getRepositoryToken(Log),
          useValue: mockLogRepository
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository
        },
      ],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
