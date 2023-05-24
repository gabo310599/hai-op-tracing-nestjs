/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorService } from './operator.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Operator } from './entities/operator.entity';

describe('OperatorService', () => {
  let service: OperatorService;
  const mockOperatorRepository = {
    //create
    create: jest.fn((dto) => {
      return {
        id: 'create',
        ...dto,
      };
    }),

    //save
    save: jest.fn((dto) => {
      return { ...dto };
    }),

    //delete
    delete: jest.fn((data) => {
      return data;
    }),
    
    //findOneBy
    findOneBy: jest.fn((data) => {
      if (data.id === 'read')
        return {
          id: data.id,
          name: 'name',
          last_name: 'last_name',
        };

      if (data.id === 'update')
        return {
          id: data.id,
        };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorService,
        {
          provide: getRepositoryToken(Operator),
          useValue: mockOperatorRepository,
        },
      ],
    }).compile();

    service = module.get<OperatorService>(OperatorService);
  });

  //Test unitario por defecto
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que crea un operario
  it('should create and return a operator', async () => {
    const dto = {
      name: 'name',
      last_name: 'last_name',
    };

    expect(await service.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'create',
        name: 'name',
        last_name: 'last_name',
      },
    });
  });

  //Test unitario que lee un operador
  it('should read a operator', async () => {
    expect(await service.getOne('read')).toEqual({
      msg: expect.any(String),
      data: {
        id: 'read',
        name: 'name',
        last_name: 'last_name',
      },
    });
  });

  //Test unitario que actualiza un operador
  it('should update a operator', async () => {
    const dto = {
      name: 'updated_name',
      last_name: 'updated_last_name',
    };

    expect(await service.updateOne('update', dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'update',
        name: 'updated_name',
        last_name: 'updated_last_name',
      },
    });
  });

  //Test unitario que elimina un operador
  it('should delete a operator', async () => {
    expect(await service.deleteOne('delete')).toEqual({
      msg: expect.any(String),
      data: 'delete',
    });
  });
});
