import { Test, TestingModule } from '@nestjs/testing';
import { OperatorDepartmentUnionService } from './operator-department-union.service';

describe('OperatorDepartmentUnionService', () => {
  let service: OperatorDepartmentUnionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperatorDepartmentUnionService],
    }).compile();

    service = module.get<OperatorDepartmentUnionService>(OperatorDepartmentUnionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
