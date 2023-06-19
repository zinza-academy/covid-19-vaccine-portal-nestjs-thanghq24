import { Test, TestingModule } from '@nestjs/testing';
import { DivisionReaderController } from './division-reader.controller';

describe('DivisionReaderController', () => {
  let controller: DivisionReaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DivisionReaderController],
    }).compile();

    controller = module.get<DivisionReaderController>(DivisionReaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
