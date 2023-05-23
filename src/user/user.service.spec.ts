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
        id: "create",
        user_name: dto.user_name,
        operator: dto.operator,
        roles: dto.roles       
      }
    }),

    //findOneBy
    findOneBy: jest.fn((dto) => {
      console.log(dto)
      if(dto.user_name === "usuario_prueba")
        return null
      else
        if(dto.user_name === "admin" || dto.user_name === "usuario_update")
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
          id: "create",
          user_name: "usuario_prueba",
          operator: { operator_id: "vfdkfdvdsvdsvmdfkvmdf"},
          roles: [AppRoles.AUTHOR]
        } 
      }
    )
  });

  // //Test unitario que actualiza un usuario
  // it('should update and return a user', async () => {
    
  //   const dto = {
  //     user_name: "usuario_update",
  //     status: true,
  //     operator_id: "vfdkfdvdsvdsvmdfkvmdf" 
  //   }

  //   expect( await service.updateOne("update", dto)).toEqual({
  //     msg: expect.any(String),
  //     data:{
  //       status: true,
  //       operator_id: "vfdkfdvdsvdsvmdfkvmdf" 
  //     }
  //   })
  // })


});
