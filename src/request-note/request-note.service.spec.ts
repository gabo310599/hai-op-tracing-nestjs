/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RequestNoteService } from './request-note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RequestNote } from './entities/request-note.entity';

describe('RequestNoteService', () => {
  let service: RequestNoteService;
  const mockRequestNoteRepository = {
    //findOneBy
    findOneBy: jest.fn((data) => {
      if (data.id === 'read')
        return {
          id: data.id,
          serial: 'serial',
          description: 'description',
          code: 'code',
          characters: 'characters',
        };
      if (data.id === 'update')
        return {
          id: data.id,
          serial: 'serial',
          description: 'description',
          code: 'code',
          characters: 'characters',
        };
    }),

    //findOne
    findOne: jest.fn((data) => {
      if (
        data.where.serial === 'serial' &&
        data.where.characters === 'characters'
      )
        return null;
      else return data;
    }),

    //Create
    create: jest.fn((dto) => {
      return {
        id: 'create',
        ...dto,
      };
    }),

    //save
    save: jest.fn((dto) => {
      return { ...dto };
    }),

    //delete
    delete: jest.fn((data) => {
      return data;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestNoteService,
        {
          provide: getRepositoryToken(RequestNote),
          useValue: mockRequestNoteRepository,
        },
      ],
    }).compile();

    service = module.get<RequestNoteService>(RequestNoteService);
  });

  //Test por defecto
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que crea una nota de pedido
  it('should create a request note', async () => {
    const dto = {
      serial: 'serial',
      description: 'description',
      code: 'code',
      characters: 'characters',
    };

    expect(await service.createOne(dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'create',
        serial: 'serial',
        description: 'description',
        code: 'code',
        characters: 'characters',
      },
    });
  });

  //Test unitario que lee una nota de pedido
  it('should read a request note', async () => {
    expect(await service.getOne('read')).toEqual({
      msg: expect.any(String),
      data: {
        id: 'read',
        serial: 'serial',
        description: 'description',
        code: 'code',
        characters: 'characters',
      },
    });
  });

  //Test unitario que actualiza una nota de pedido
  it('should update a request note', async () => {
    const dto = {
      serial: 'updated_serial',
      description: 'updated_description',
      code: 'updated_code',
      characters: 'updated_characters',
    };

    expect(await service.updateOne('update', dto)).toEqual({
      msg: expect.any(String),
      data: {
        id: 'update',
        serial: 'updated_serial',
        description: 'updated_description',
        code: 'updated_code',
        characters: 'updated_characters',
      },
    });
  });

  //Test unitario que elimina una nota de pedido
  it('should delete a request note', async () => {
    expect(await service.deleteOne('delete')).toEqual({
      msg: expect.any(String),
      data: 'delete',
    });
  });
  
});
