/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import { AreaEnum } from './enums/area.enum';

describe('MachineController', () => {
  
  let controller: MachineController;

  const mockMachineService = {
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
      controllers: [MachineController],
      providers: [MachineService], 
    })
      .overrideProvider(MachineService)
      .useValue(mockMachineService)
      .compile();

    controller = module.get<MachineController>(MachineController);
  });

  //Test unitario por defecto de controlador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Test unitario para peticion post
  it('should create a machine', async () => {
    const dto = {
      brand: 'Marca',
      model: 'Modelo',
      number: '1',
      area: AreaEnum.ETIQUETAS,
      department_id: "dvkmldsmv",
      total_white_hours: 5,
      total_black_hours: 5,
      total_points: 50
    };

    expect(await controller.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        brand: 'Marca',
        model: 'Modelo',
        number: '1',
        area: AreaEnum.ETIQUETAS,
        department_id: "dvkmldsmv",
        total_white_hours: 5,
        total_black_hours: 5,
        total_points: 50
      },
    });

    expect(await mockMachineService.createOne).toHaveBeenCalled();
  });

  //Test unitario que regresa un usuario
  it('should read a machine', async () => {
    expect(await controller.getOne('vfdvs')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockMachineService.getOne).toHaveBeenCalled();
  });

  //Test unitario para peticion put
  it('should update a machine', async () => {
    const dto = {
      brand: 'Marca',
      model: 'Modelo',
      number: '1',
      area: AreaEnum.ETIQUETAS,
      department_id: "dvkmldsmv",
      total_white_hours: 5,
      total_black_hours: 5,
      total_points: 50
    };

    expect(await controller.updateOne('', dto)).toEqual({
      msg: expect.any(String),
      data: {
        brand: 'Marca',
        model: 'Modelo',
        number: '1',
        area: AreaEnum.ETIQUETAS,
        department_id: "dvkmldsmv",
        total_white_hours: 5,
        total_black_hours: 5,
        total_points: 50
      },
    });

    expect(await mockMachineService.updateOne).toHaveBeenCalled();
  });

  //Test unitario que elimina un usuario
  it('should delete a machine', async () => {
    expect(await controller.deleteOne('dsvkmsd')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockMachineService.deleteOne).toHaveBeenCalled();
  });
});
