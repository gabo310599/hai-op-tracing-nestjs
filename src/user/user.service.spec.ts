/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Operator } from '../operator/entities/operator.entity';
import { AppRoles } from '../app.roles';

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
    findOneBy: jest.fn((data) => {

      if(data.user_name === "create_user")
        return null
      if(data.user_name === "admin")
        return {id: "admin"}
      if(data.user_name === "update_user")
        return null
      if(data.id === "update")
         return new User("update_user", "update_password")
           
    }),

    //save
    save: jest.fn( (dto) => {
      return {...dto}    
    }),

    //delete
    delete: jest.fn( (data) => {
      return data
    }),

    //findOne
    findOne: jest.fn( (data) => {
      
      if(data.where.id === "read")
        return {
          ...data.where,
          user_name: "user_name",
          password: "password"
        }
    })

  };
  const mockOperatorRepository = {
      //findOneBy
      findOneBy: jest.fn( () => {
        return new Operator()   
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
  it('should create a user', async () => {

    const dto = {
      user_name: "create_user",
      password: "create_password",
      operator_id: "operator_id",
      roles: [AppRoles.ADMIN]
    }

    expect(await service.createOne(dto)).toEqual(
      {
        msg: expect.any(String),
        data: {
          id: "create",
          user_name: "create_user",
          operator: expect.any(Operator),
          roles: [AppRoles.ADMIN]
        } 
      }
    )
  });

  //Test unitario que lee un usuario
  it('should return a user', async () => {
    expect( await service.getOne("read") ).toEqual(
      {
        msg: expect.any(String),
        data: {
          id: "read",
          user_name: "user_name",
          password: "password"
        }
      }
    )
  })

  //Test unitario que actualiza un usuario
  it('should update a user', async () => {
    
    const dto = {
      user_name: "update_user",
      password: "update_password",
      operator_id: "operator_id",
      roles: [AppRoles.ADMIN],
      status: true
    }

    expect( await service.updateOne("update", dto)).toEqual({
      msg: expect.any(String),
      data:{
        user_name: "update_user",
        password: "update_password",
        operator_id: "operator_id",
        roles: [AppRoles.ADMIN],
        status: true
      }
    })
  })

  //Test unitario que elimina un usuario
  it('should delete a user', async () => {
    expect( await service.deleteOne("delete") ).toEqual(
      {
        msg: expect.any(String),
        data: "delete"
      }
    )
  })

});
