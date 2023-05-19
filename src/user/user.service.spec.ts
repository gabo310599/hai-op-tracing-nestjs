/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Operator } from '../operator/entities/operator.entity';
import { AppRoles } from '../app.roles';
import { CreateUserDto } from './dtos/create-user.dto';

describe('UserService', () => {

  let service: UserService;
  const mockUserRepository = {
  
    //Create
    create: jest.fn((dto) =>{
      return{
        id: "nfdjfnds",
        user_name: dto.user_name,
        operator: dto.operator,
        roles: dto.roles       
      }
    }),

    //findOneBy
    findOneBy: jest.fn(() => {
        return null  
    }),

    //save
    save: jest.fn( (dto) => {
      return {...dto}    
    })

  };
  const mockOperatorRepository = {
      //findOneBy
      findOneBy: jest.fn( () => {
        return {operator_id: "vfdkfdvdsvdsvmdfkvmdf"}    
      })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, 
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository
        },
        {
          provide: getRepositoryToken(Operator),
          useValue: mockOperatorRepository
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  //Test unitario por defecto de servicio 
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que crea un usuario
  it('should create and return a user', async () => {

    const dto = new CreateUserDto(
      "usuario_prueba",
      "password_prueba",
      "vfdkfdvdsvdsvmdfkvmdf",
      [AppRoles.AUTHOR]
    )

    expect(await service.createOne(dto)).toEqual(
      {
        msg: expect.any(String),
        data: {
          id: "nfdjfnds",
          user_name: "usuario_prueba",
          operator: { operator_id: "vfdkfdvdsvdsvmdfkvmdf"},
          roles: [AppRoles.AUTHOR]
        } 
      }
    )
  });


});
