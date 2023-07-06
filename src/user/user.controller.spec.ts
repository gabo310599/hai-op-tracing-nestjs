/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
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
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  //Test unitario por defecto de controlador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Test unitario para peticion post
  it('should create a user', async () => {
    const dto = {
      user_name: 'Prueba',
      password: 'prueba',
      operator_id: 'dvfdvads',
      roles: [],
      status: false
    };

    expect(await controller.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        user_name: 'Prueba',
        password: 'prueba',
        operator_id: 'dvfdvads',
        roles: [],
        status: false
      },
    });

    expect(await mockUserService.createOne).toHaveBeenCalled();
  });

  //Test unitario que regresa un usuario
  it('should read a user', async () => {
    expect(await controller.getOne('vfdvs')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockUserService.getOne).toHaveBeenCalled();
  });

  //Test unitario para peticion put
  it('should update a user', async () => {
    const dto = {
      user_name: 'Prueba2',
      password: 'prueba2',
      operator_id: 'dvfddcfvads',
      status: true,
      roles: [],
    };

    expect(await controller.updateOne('', dto)).toEqual({
      msg: expect.any(String),
      data: {
        user_name: 'Prueba2',
        password: 'prueba2',
        operator_id: 'dvfddcfvads',
        status: true,
        roles: [],
      },
    });

    expect(await mockUserService.updateOne).toHaveBeenCalled();
  });

  //Test unitario que elimina un usuario
  it('should delete a user', async () => {
    expect(await controller.deleteOne('dsvkmsd')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockUserService.deleteOne).toHaveBeenCalled();
  });

});
