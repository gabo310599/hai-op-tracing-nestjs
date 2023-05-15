/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorDepartmentUnionController } from './operator-department-union.controller';
import { OperatorDepartmentUnionService } from './operator-department-union.service';

describe('OperatorDepartmentUnionController', () => {
  
  let controller: OperatorDepartmentUnionController;

  const mockOperatorDepartmentUnionService = {};
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperatorDepartmentUnionController],
      providers: [OperatorDepartmentUnionService],
    })
      .overrideProvider(OperatorDepartmentUnionService)
      .useValue(mockOperatorDepartmentUnionService)
      .compile();

    controller = module.get<OperatorDepartmentUnionController>(OperatorDepartmentUnionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
