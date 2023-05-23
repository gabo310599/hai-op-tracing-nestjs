/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RequestNoteService } from './request-note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RequestNote } from './entities/request-note.entity';

describe('RequestNoteService', () => {
  
  let service: RequestNoteService;
  const mockRequestNoteRepository = {

    //findOneBy
    findOne: jest.fn((dto) => {
      if (dto.where.serial === "IV-0000")
        return null
      else
        return dto
    }),

    //Create
    create: jest.fn((dto) => {
      return{
        id: "create",
        serial: dto.serial,
        description: dto.description,
        code: dto.code,
        characters: dto.characters

      }
    }),

    //save
    save: jest.fn( (dto) => {
      return {...dto}    
    })

  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestNoteService, 
        {
          provide: getRepositoryToken(RequestNote),
          useValue: mockRequestNoteRepository
        }
      ],
    }).compile();

    service = module.get<RequestNoteService>(RequestNoteService);
  });

  
  //Test por defecto
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Test unitario que crea una nota de pedido
  it('should create a request-note', async () => {

    const dto = {
      serial: "IV-0000",
      description: "descripcion de prueba",
      code: "CODE-TEST",
      characters: "A" 
    }

    expect( await service.createOne(dto)).toEqual(
      {
        msg: expect.any(String),
        data: {
          id: "create",
          serial: "IV-0000",
          description: "descripcion de prueba",
          code: "CODE-TEST",
          characters: "A"
        },
      }
    )

  })

  // //Test unitario que actualiza una nota de pedido
  // it('should update and return a user', async () => {
    
  //   const dto = {
  //     serial: "IU-0000",
  //     description: "descripcion de prueba",
  //     code: "CODE-TEST",
  //     characters: "A" 
  //   }

  //   expect( await service.updateOne("update", dto)).toEqual(
  //     {
  //       msg: expect.any(String),
  //       data: {
  //         id: "update",
  //         serial: "IU-0000",
  //         description: "descripcion de prueba",
  //         code: "CODE-TEST",
  //         characters: "A"
  //       }
  //     })
  // })

  

});
