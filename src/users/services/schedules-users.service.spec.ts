import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesUsersService } from './schedules-users.service';

describe('SchedulesUsersService', () => {
  let service: SchedulesUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulesUsersService],
    }).compile();

    service = module.get<SchedulesUsersService>(SchedulesUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
