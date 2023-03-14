import { Test, TestingModule } from '@nestjs/testing';
import { OperatorDepartmentIntersectionService } from './operator-department-intersection.service';

describe('OperatorDepartmentIntersectionService', () => {
  let service: OperatorDepartmentIntersectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperatorDepartmentIntersectionService],
    }).compile();

    service = module.get<OperatorDepartmentIntersectionService>(OperatorDepartmentIntersectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
