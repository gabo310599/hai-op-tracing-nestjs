import { Test, TestingModule } from '@nestjs/testing';
import { OperatorDepartmentUnionController } from './operator-department-union.controller';

describe('OperatorDepartmentUnionController', () => {
  let controller: OperatorDepartmentUnionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperatorDepartmentUnionController],
    }).compile();

    controller = module.get<OperatorDepartmentUnionController>(OperatorDepartmentUnionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
