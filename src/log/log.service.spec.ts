/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from './log.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Log } from './entities/log.entity';

describe('LogService', () => {
  
  let service: LogService;

  const mockLogRepository = {

    //save
    save: jest.fn( (log) => {
      return {
        id: "create",
        ...log
      }
    }),

    //findOne
    findOne: jest.fn( (data) => {
      if(data.where.id === "read")
        return{
          id: data.where.id,
          user: new User("user_name", "password"),
          log_date: new Date(),
          log: "log"
        }
    })

  };

  const mockUserRepository = {
    //findOneBy 
    findOneBy: jest.fn( () => {
      return new User("user_name", "password");
    })
  }

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

  //Test unitario por defecto
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que crea un log
  it('should create a log', async () => {
    
    const dto = {
      user_id: "user_id",
      log: "log"
    }
    
    expect( await service.createOne(dto) ).toEqual(
      {
        msg: expect.any(String),
        data: {
          id: "create",
          user: expect.any(User),
          log_date: expect.any(Date),
          log: "log"
        }
      }
    )
  })

  //Test unitario que lee un log
  it('should read a log', async () => {
    expect( await service.getOne("read") ).toEqual(
      {
        msg: expect.any(String),
        data: {
          id: "read",
          user: expect.any(User),
          log_date: expect.any(Date),
          log: "log"
        }
      }
    )
  })

});
