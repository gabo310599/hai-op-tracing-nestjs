/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

describe('DepartmentController', () => {
  
  let controller: DepartmentController;

  const mockDepartmentService = {
    //Post
    createOne: jest.fn((dto) => {
      return {
        msg: 'peticion exitosa',
        data: { ...dto },
      };
    }),

    //Put
    updateOne: jest.fn((id, dto) => {
      return {
        msg: 'peticion exitosa',
        data: { ...dto },
      };
    }),

    //Get
    getOne: jest.fn(() => {
      return {
        msg: 'peticion exitosa',
        data: [],
      };
    }),

    //Delete
    deleteOne: jest.fn((id) => {
      return {
        msg: 'peticion exitosa',
        data: [],
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [DepartmentService],
    })
      .overrideProvider(DepartmentService)
      .useValue(mockDepartmentService)
      .compile();

    controller = module.get<DepartmentController>(DepartmentController);
  });

  //Test unitario por defecto de controlador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Test unitario para peticion post
  it('should create a department', async () => {
    const dto = {
      name: 'Prueba',
      days_time_limit: 1,
      process_turn: 0,
    };

    expect(await controller.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        name: 'Prueba',
        days_time_limit: 1,
        process_turn: 0,
      },
    });

    expect(await mockDepartmentService.createOne).toHaveBeenCalled();
  });

  //Test unitario que regresa un usuario
  it('should read a department', async () => {
    expect(await controller.getOne('vfdvs')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockDepartmentService.getOne).toHaveBeenCalled();
  });

  //Test unitario para peticion put
  it('should update a department', async () => {
    const dto = {
      name: 'Prueba',
      days_time_limit: 1,
      process_turn: 0,
    };

    expect(await controller.updateOne('', dto)).toEqual({
      msg: expect.any(String),
      data: {
        name: 'Prueba',
        days_time_limit: 1,
        process_turn: 0,
      },
    });

    expect(await mockDepartmentService.updateOne).toHaveBeenCalled();
  });

  //Test unitario que elimina un usuario
  it('should delete a department', async () => {
    expect(await controller.deleteOne('dsvkmsd')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockDepartmentService.deleteOne).toHaveBeenCalled();
  });
});
