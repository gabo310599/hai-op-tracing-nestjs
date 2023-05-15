/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductionOrderController } from './production-order.controller';
import { ProductionOrderService } from './production-order.service';

describe('ProductionOrderController', () => {

  let controller: ProductionOrderController;

  const mockProductionOrderService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionOrderController],
      providers: [ProductionOrderService]
    })
      .overrideProvider(ProductionOrderService)
      .useValue(mockProductionOrderService)
      .compile();

    controller = module.get<ProductionOrderController>(ProductionOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
