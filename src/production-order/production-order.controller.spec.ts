/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductionOrderController } from './production-order.controller';
import { ProductionOrderService } from './production-order.service';
import { WarpedEnum } from './enums/warped.enum';

describe('ProductionOrderController', () => {
  let controller: ProductionOrderController;

  const mockProductionOrderService = {
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
      controllers: [ProductionOrderController],
      providers: [ProductionOrderService],
    })
      .overrideProvider(ProductionOrderService)
      .useValue(mockProductionOrderService)
      .compile();

    controller = module.get<ProductionOrderController>(
      ProductionOrderController,
    );
  });

  //Test unitario por defecto de controlador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Test unitario para peticion post
  it('should create a production order', async () => {
    const dto = {
      op_number: '12345',
      width: 50,
      warped: WarpedEnum.BLANCO,
      points: 50,
    };

    expect(await controller.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        op_number: '12345',
        width: 50,
        warped: WarpedEnum.BLANCO,
        points: 50,
      },
    });

    expect(await mockProductionOrderService.createOne).toHaveBeenCalled();
  });

  //Test unitario que regresa un usuario
  it('should read a production order', async () => {
    expect(await controller.getOne('vfdvs')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockProductionOrderService.getOne).toHaveBeenCalled();
  });

  //Test unitario para peticion put
  it('should update a production order', async () => {
    const dto = {
      op_number: '12345',
      width: 50,
      warped: WarpedEnum.BLANCO,
      points: 50,
    };

    expect(await controller.updateOne('', dto)).toEqual({
      msg: expect.any(String),
      data: {
        op_number: '12345',
        width: 50,
        warped: WarpedEnum.BLANCO,
        points: 50,
      },
    });

    expect(await mockProductionOrderService.updateOne).toHaveBeenCalled();
  });

  //Test unitario que elimina un usuario
  it('should delete a production order', async () => {
    expect(await controller.deleteOne('dsvkmsd')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockProductionOrderService.deleteOne).toHaveBeenCalled();
  });
});
