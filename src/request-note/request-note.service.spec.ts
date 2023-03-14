import { Test, TestingModule } from '@nestjs/testing';
import { RequestNoteService } from './request-note.service';

describe('RequestNoteService', () => {
  let service: RequestNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestNoteService],
    }).compile();

    service = module.get<RequestNoteService>(RequestNoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
