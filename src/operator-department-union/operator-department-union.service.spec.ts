/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorDepartmentUnionService } from './operator-department-union.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Operator } from '../operator/entities/operator.entity';
import { Department } from '../department/entities/department.entity';
import { OperatorDepartmentUnion } from './entities/operator-department-union.entity';

describe('OperatorDepartmentUnionService', () => {
  let service: OperatorDepartmentUnionService;

  const mockOperatorDepartmentUnionRepository = {
    //save
    save: jest.fn((union) => {
      return {
        id: 'create',
        ...union,
      };
    }),

    //delete
    delete: jest.fn((data) => {
      return data;
    }),

    //findOne
    findOne: jest.fn( (data) => { 
      return{
        id: data.where.id,
        operator: new Operator(),
        department: new Department(),
      }
    })
  };

  const mockOperatorRepository = {
    //findOneBy
    findOneBy: jest.fn(() => {
      return new Operator();
    }),
  };

  const mockDepartmentRepository = {
    //findOneBy
    findOneBy: jest.fn(() => {
      return new Department();
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorDepartmentUnionService,
        {
          provide: getRepositoryToken(OperatorDepartmentUnion),
          useValue: mockOperatorDepartmentUnionRepository,
        },
        {
          provide: getRepositoryToken(Operator),
          useValue: mockOperatorRepository,
        },
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository,
        },
      ],
    }).compile();

    service = module.get<OperatorDepartmentUnionService>(
      OperatorDepartmentUnionService,
    );
  });

  //Test unitario por defecto
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que crea una union departamento-operador
  it('should create a union between operator and department', async () => {
    const dto = {
      operator_id: 'operator_id',
      department_id: 'department_id',
    };

    expect(await service.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'create',
        operator: expect.any(Operator),
        department: expect.any(Department),
      },
    });
  });

  //Test unitario que lee una union departamento-operador
  it('should read a union between operator and department', async () => {
    expect( await service.getOne("read") ).toEqual(
      {
        msg: expect.any(String),
        data: {
          id: "read",
          operator: expect.any(Operator),
          department: expect.any(Department)
        }
      }
    )
  })

  //Test unitario que elimina una union departamento-operador
  it('should delete a union between operator and department', async () => {
    expect(await service.deleteOne('delete')).toEqual({
      msg: expect.any(String),
      data: 'delete',
    });
  });

});
