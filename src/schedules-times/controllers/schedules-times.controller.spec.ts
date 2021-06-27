import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesTimesController } from './schedules-times.controller';

describe('SchedulesTimesController', () => {
  let controller: SchedulesTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesTimesController],
    }).compile();

    controller = module.get<SchedulesTimesController>(SchedulesTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
