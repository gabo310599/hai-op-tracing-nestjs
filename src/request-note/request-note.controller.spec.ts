/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RequestNoteController } from './request-note.controller';
import { RequestNoteService } from './request-note.service';

describe('RequestNoteController', () => {
  
  let controller: RequestNoteController;

  const mockRequestNoteService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestNoteController],
      providers: [RequestNoteService]
    })
      .overrideProvider(RequestNoteService)
      .useValue(mockRequestNoteService)
      .compile();

    controller = module.get<RequestNoteController>(RequestNoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
