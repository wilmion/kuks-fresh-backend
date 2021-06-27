import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesTimesService } from './schedules-times.service';

describe('SchedulesTimesService', () => {
  let service: SchedulesTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulesTimesService],
    }).compile();

    service = module.get<SchedulesTimesService>(SchedulesTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
