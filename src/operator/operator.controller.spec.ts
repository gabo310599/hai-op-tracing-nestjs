/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';

describe('OperatorController', () => {

  let controller: OperatorController;

  const mockOperatorService = {
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
      controllers: [OperatorController],
      providers: [OperatorService] 
    })
      .overrideProvider(OperatorService)
      .useValue(mockOperatorService)
      .compile();

    controller = module.get<OperatorController>(OperatorController);
  });

  //Test unitario por defecto de controlador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Test unitario para peticion post
  it('should create a operator', async () => {
    const dto = {
      name: 'Prueba',
      last_name: 'Prueba',
    };

    expect(await controller.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        name: 'Prueba',
        last_name: 'Prueba',
      },
    });

    expect(await mockOperatorService.createOne).toHaveBeenCalled();
  });

  //Test unitario que regresa un usuario
  it('should read a operator', async () => {
    expect(await controller.getOne('vfdvs')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockOperatorService.getOne).toHaveBeenCalled();
  });

  //Test unitario para peticion put
  it('should update a operator', async () => {
    const dto = {
      name: 'Prueba',
      last_name: 'Prueba',
    };

    expect(await controller.updateOne('', dto)).toEqual({
      msg: expect.any(String),
      data: {
        name: 'Prueba',
        last_name: 'Prueba',
      },
    });

    expect(await mockOperatorService.updateOne).toHaveBeenCalled();
  });

  //Test unitario que elimina un usuario
  it('should delete a operator', async () => {
    expect(await controller.deleteOne('dsvkmsd')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockOperatorService.deleteOne).toHaveBeenCalled();
  });
});
