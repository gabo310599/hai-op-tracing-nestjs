/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';

describe('ProcessController', () => {

  let controller: ProcessController;

  const mockProcessService = {
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
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessController],
      providers: [ProcessService],
    })
      .overrideProvider(ProcessService)
      .useValue(mockProcessService)
      .compile();

    controller = module.get<ProcessController>(ProcessController);
  });

  //Test unitario por defecto de controlador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Test unitario para peticion post
  it('should create a process', async () => {
    
    const dto = {
      request_id: 'vflvnldskn',
      department_id: 'FVDFDABDFB',
      operator_id: 'VFDVSDFV',
      machine_id: 'Adsvkndlf',
      order_id: "vbfdskjvn",
      date_in: "01/02/23",
      date_out: "02/03/23"
    };

    expect(await controller.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        request_id: 'vflvnldskn',
        department_id: 'FVDFDABDFB',
        operator_id: 'VFDVSDFV',
        machine_id: 'Adsvkndlf',
        order_id: "vbfdskjvn",
        date_in: "01/02/23",
        date_out: "02/03/23"
      },
    });

    expect(await mockProcessService.createOne).toHaveBeenCalled();
  });

  //Test unitario que regresa un usuario
  it('should read a process', async () => {
    expect(await controller.getOne('vfdvs')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockProcessService.getOne).toHaveBeenCalled();
  });

  //Test unitario para peticion put
  it('should update a process', async () => {
    
    const dto = {
      request_id: 'vflvnldskn',
      department_id: 'FVDFDABDFB',
      operator_id: 'VFDVSDFV',
      machine_id: 'Adsvkndlf',
      order_id: "vbfdskjvn",
      date_in: "01/02/23",
      date_out: "02/03/23",
      observation: "fncvsdjkvn"
    };

    expect(await controller.updateOne('', dto)).toEqual({
      msg: expect.any(String),
      data: {
        request_id: 'vflvnldskn',
        department_id: 'FVDFDABDFB',
        operator_id: 'VFDVSDFV',
        machine_id: 'Adsvkndlf',
        order_id: "vbfdskjvn",
        date_in: "01/02/23",
        date_out: "02/03/23",
        observation: "fncvsdjkvn"
      },
    });

    expect(await mockProcessService.updateOne).toHaveBeenCalled();
  });

  //Test unitario que elimina un usuario
  it('should delete a process', async () => {
    expect(await controller.deleteOne('dsvkmsd')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockProcessService.deleteOne).toHaveBeenCalled();
  });
});
