/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductionOrderService } from './production-order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductionOrder } from './entities/production-order.entity';
import { RequestNote } from '../request-note/entities/request-note.entity';

describe('ProductionOrderService', () => {
  
  let service: ProductionOrderService;
  const mockProductionOrderRepository = {};
  const mockRequestNoteRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionOrderService, 
        {
          provide: getRepositoryToken(ProductionOrder),
          useValue: mockProductionOrderRepository
        },
        {
          provide: getRepositoryToken(RequestNote),
          useValue: mockRequestNoteRepository
        }
    ],
    }).compile();

    service = module.get<ProductionOrderService>(ProductionOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
