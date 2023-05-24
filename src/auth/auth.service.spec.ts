/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt/dist';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { hash } from 'bcryptjs';

describe('AuthService', () => {
  
  let service: AuthService;

  const mockUserService = {
    //findByUserName
    findByUserName: jest.fn( async (user_name) => {
      const password = await hash("password", 10)
      return new User(user_name,  password)
    })
  };

  const mockJwtService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  //Test unitario por defecto
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que valida un usuario (password y user name)
  it('should validate and return a user', async () => {
    expect( await service.validateUser("prueba", "password") ).toEqual(
      {
        user_name: "prueba"
      }
    )
  })

});
