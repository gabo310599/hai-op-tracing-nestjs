import { Test, TestingModule } from '@nestjs/testing';
import { OperatorDepartmentIntersectionController } from './operator-department-intersection.controller';

describe('OperatorDepartmentIntersectionController', () => {
  let controller: OperatorDepartmentIntersectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperatorDepartmentIntersectionController],
    }).compile();

    controller = module.get<OperatorDepartmentIntersectionController>(OperatorDepartmentIntersectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
