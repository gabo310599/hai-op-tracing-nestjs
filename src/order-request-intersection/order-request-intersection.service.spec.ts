import { Test, TestingModule } from '@nestjs/testing';
import { OrderRequestIntersectionService } from './order-request-intersection.service';

describe('OrderRequestIntersectionService', () => {
  let service: OrderRequestIntersectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderRequestIntersectionService],
    }).compile();

    service = module.get<OrderRequestIntersectionService>(OrderRequestIntersectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
