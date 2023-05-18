/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt/dist';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  
  let service: AuthService;
  const mockUserService = {};
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
