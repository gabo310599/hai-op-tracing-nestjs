/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';

describe('DepartmentService', () => {
  let service: DepartmentService;
  const mockDepartmentRepository = {
    //create
    create: jest.fn((dto) => {
      return {
        id: 'create',
        ...dto,
      };
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
          days_time_limit: 0,
          process_turn: 0,
        };

      if (data.id === 'update')
        return {
          ...data,
        };
    }),

    //save
    save: jest.fn((department) => {
      return {
        ...department,
      };
    }),

    //
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository,
        },
      ],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
  });

  //Test unitario por defecto
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que crea un departamento
  it('should create a department', async () => {
    const dto = {
      name: 'name',
      days_time_limit: 0,
      process_turn: 0,
    };

    expect(await service.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'create',
        name: 'name',
        days_time_limit: 0,
        process_turn: 0,
      },
    });
  });

  //Test unitario que lee un departamento
  it('should read a department', async () => {
    expect(await service.getOne('read')).toEqual({
      msg: expect.any(String),
      data: {
        id: 'read',
        name: 'name',
        days_time_limit: 0,
        process_turn: 0,
      },
    });
  });

  //Test unitario que actualiza un departamento
  it('should update a department', async () => {
    const dto = {
      name: 'updated_name',
      days_time_limit: 1,
      process_turn: 1,
    };

    expect(await service.updateOne('update', dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'update',
        name: 'updated_name',
        days_time_limit: 1,
        process_turn: 1,
      },
    });
  });

  //Test unitario que elimina un departamento
  it('should delete a department', async () => {
    expect(await service.deleteOne('delete')).toEqual({
      msg: expect.any(String),
      data: 'delete',
    });
  });
  
});
