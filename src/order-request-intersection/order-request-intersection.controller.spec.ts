import { Test, TestingModule } from '@nestjs/testing';
import { OrderRequestIntersectionController } from './order-request-intersection.controller';

describe('OrderRequestIntersectionController', () => {
  let controller: OrderRequestIntersectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderRequestIntersectionController],
    }).compile();

    controller = module.get<OrderRequestIntersectionController>(OrderRequestIntersectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
