/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './log.controller';
import { LogService } from './log.service';

describe('LogController', () => {

  let controller: LogController;

  const mockLogService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
      providers: [LogService]
    })
      .overrideProvider(LogService)
      .useValue(mockLogService)
      .compile();

    controller = module.get<LogController>(LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
