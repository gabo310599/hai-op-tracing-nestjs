/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductionOrderService } from './production-order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductionOrder } from './entities/production-order.entity';
import { RequestNote } from '../request-note/entities/request-note.entity';
import { WarpedEnum } from './enums/warped.enum';

describe('ProductionOrderService', () => {
  let service: ProductionOrderService;
  const mockProductionOrderRepository = {
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

    //save
    save: jest.fn((dto) => {
      return { ...dto };
    }),

    //findOne
    findOne: jest.fn((data) => {
      if (data.where.id === 'read')
        return {
          id: data.where.id,
          op_number: 'op_number',
          width: 0,
          warped: WarpedEnum.NEGRO,
          points: 0,
        };
    }),

    //findOneBy
    findOneBy: jest.fn((data) => {
      if (data.id === 'update')
        return {
          id: data.id,
          op_number: 'updated_p_number',
          width: 0,
          warped: WarpedEnum.NEGRO,
          points: 0,
        };
    }),
  };
  const mockRequestNoteRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionOrderService,
        {
          provide: getRepositoryToken(ProductionOrder),
          useValue: mockProductionOrderRepository,
        },
        {
          provide: getRepositoryToken(RequestNote),
          useValue: mockRequestNoteRepository,
        },
      ],
    }).compile();

    service = module.get<ProductionOrderService>(ProductionOrderService);
  });

  //Test unitario por defecto
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que crea una orden de produccion
  it('should create a production order', async () => {
    const dto = {
      op_number: 'op_number',
      width: 0,
      warped: WarpedEnum.NEGRO,
      points: 0,
    };

    expect(await service.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'create',
        op_number: 'op_number',
        width: 0,
        warped: WarpedEnum.NEGRO,
        points: 0,
      },
    });
  });

  //Test unitario que lee una orden de produccion
  it('should read a production order', async () => {
    expect(await service.getOne('read')).toEqual({
      msg: expect.any(String),
      data: {
        id: 'read',
        op_number: 'op_number',
        width: 0,
        warped: WarpedEnum.NEGRO,
        points: 0,
      },
    });
  });

  //Test unitario que actualiza una orden de produccion
  it('should update a production order', async () => {
    const dto = {
      op_number: 'updated_op_number',
      width: 0,
      warped: WarpedEnum.NEGRO,
      points: 0,
    };

    expect(await service.updateOne('update', dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'update',
        op_number: 'updated_op_number',
        width: 0,
        warped: WarpedEnum.NEGRO,
        points: 0,
      },
    });
  });

  //Test unitario que elimina una orden de produccion
  it('should delete a produccion order', async () => {
    expect(await service.deleteOne('delete')).toEqual({
      msg: expect.any(String),
      data: 'delete',
    });
  });
  
});
