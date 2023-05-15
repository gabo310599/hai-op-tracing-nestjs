/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';

describe('OperatorController', () => {

  let controller: OperatorController;

  const mockOperatorService = {};

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
