/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppRoles } from '../app.roles';
import { Operator } from '../operator/entities/operator.entity';

describe('AuthController', () => {

  let controller: AuthController;
  
  const mockAuthService = {
    //login
    login: jest.fn( (user) => {
      return {
        accessToken: "token",
        user: user
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  //Test unitario por defecto de controlador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Test unitario para login
  it('should return a log a user', async () => {

    const user = {
      id: "id",
      user_name: "user_name",
      password: "password",
      status: true,
      roles: [AppRoles.ADMIN],
      created_at: new Date(),
      operator: new Operator(),
      log: [],
      hashPassword: null
    }

    expect( await controller.login(user)).toEqual(
      {
        msg: expect.any(String),
        data: {
          accessToken: "token",
          user: {
            id: "id",
            user_name: "user_name",
            password: "password",
            status: true,
            roles: [AppRoles.ADMIN],
            created_at: expect.any(Date),
            operator: expect.any(Operator),
            log: [],
            hashPassword: null
          }
        }
      }
    )
  })

});
