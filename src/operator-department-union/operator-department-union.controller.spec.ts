/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorDepartmentUnionController } from './operator-department-union.controller';
import { OperatorDepartmentUnionService } from './operator-department-union.service';

describe('OperatorDepartmentUnionController', () => {
  
  let controller: OperatorDepartmentUnionController;

  const mockOperatorDepartmentUnionService = {
        //Post
        createOne: jest.fn((dto) => {
          return {
            msg: 'peticion exitosa',
            data: { ...dto },
          };
        }),
  
        //Get
        getOne: jest.fn(() => {
          return {
            msg: 'peticion exitosa',
            data: [],
          };
        }),
    
        //Delete
        deleteOne: jest.fn((id) => {
          return {
            msg: 'peticion exitosa',
            data: [],
          };
        }),
  };
  
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

  //Test unitario por defecto de controlador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Test unitario para peticion post
  it('should create a operator-department-union', async () => {
    const dto = {
      department_id: 'dklnvldsk',
      operator_id: 'dvfdvads',
    };

    expect(await controller.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        department_id: 'dklnvldsk',
        operator_id: 'dvfdvads',
      },
    });

    expect(await mockOperatorDepartmentUnionService.createOne).toHaveBeenCalled();
  });

  //Test unitario que regresa un usuario
  it('should read a operator-department-union', async () => {
    expect(await controller.getOne('vfdvs')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockOperatorDepartmentUnionService.getOne).toHaveBeenCalled();
  });

  //Test unitario que elimina un usuario
  it('should delete a operator-department-union', async () => {
    expect(await controller.deleteOne('dsvkmsd')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockOperatorDepartmentUnionService.deleteOne).toHaveBeenCalled();
  });
});
