/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';

describe('MachineController', () => {
  
  let controller: MachineController;

  const mockMachineService = {};

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
