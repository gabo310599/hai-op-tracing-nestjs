/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RequestNoteController } from './request-note.controller';
import { RequestNoteService } from './request-note.service';

describe('RequestNoteController', () => {
  let controller: RequestNoteController;

  const mockRequestNoteService = {
    //Post
    createOne: jest.fn((dto) => {
      return {
        msg: 'peticion exitosa',
        data: { ...dto },
      };
    }),

    //Put
    updateOne: jest.fn((id, dto) => {
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
      controllers: [RequestNoteController],
      providers: [RequestNoteService],
    })
      .overrideProvider(RequestNoteService)
      .useValue(mockRequestNoteService)
      .compile();

    controller = module.get<RequestNoteController>(RequestNoteController);
  });

  //Test unitario por defecto de controlador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Test unitario para peticion post
  it('should create a request note', async () => {
    
    const dto = {
      serial: 'IV-0000',
      code: 'FVDFDABDFB',
      description: 'VFDVSDFV',
      characters: 'A',
    };

    expect(await controller.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        serial: 'IV-0000',
        code: 'FVDFDABDFB',
        description: 'VFDVSDFV',
        characters: 'A',
      },
    });

    expect(await mockRequestNoteService.createOne).toHaveBeenCalled();
  });

  //Test unitario que regresa un usuario
  it('should read a request note', async () => {
    expect(await controller.getOne('vfdvs')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockRequestNoteService.getOne).toHaveBeenCalled();
  });

  //Test unitario para peticion put
  it('should update a request note', async () => {
    
    const dto = {
      serial: 'IV-0000',
      code: 'FVDFDABDFB',
      description: 'VFDVSDFV',
      characters: 'A',
    };

    expect(await controller.updateOne('', dto)).toEqual({
      msg: expect.any(String),
      data: {
        serial: 'IV-0000',
        code: 'FVDFDABDFB',
        description: 'VFDVSDFV',
        characters: 'A',
      },
    });

    expect(await mockRequestNoteService.updateOne).toHaveBeenCalled();
  });

  //Test unitario que elimina un usuario
  it('should delete a request note', async () => {
    expect(await controller.deleteOne('dsvkmsd')).toEqual({
      msg: expect.any(String),
      data: [],
    });
    expect(await mockRequestNoteService.deleteOne).toHaveBeenCalled();
  });
  
});
