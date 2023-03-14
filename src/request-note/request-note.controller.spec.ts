import { Test, TestingModule } from '@nestjs/testing';
import { RequestNoteController } from './request-note.controller';

describe('RequestNoteController', () => {
  let controller: RequestNoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestNoteController],
    }).compile();

    controller = module.get<RequestNoteController>(RequestNoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
