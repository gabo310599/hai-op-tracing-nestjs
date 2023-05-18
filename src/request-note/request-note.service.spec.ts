/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RequestNoteService } from './request-note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RequestNote } from './entities/request-note.entity';

describe('RequestNoteService', () => {
  
  let service: RequestNoteService;
  const mockRequestNoteRepository = {};

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
