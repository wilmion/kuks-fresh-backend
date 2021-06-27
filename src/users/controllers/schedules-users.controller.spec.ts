import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesUsersController } from './schedules-users.controller';

describe('SchedulesUsersController', () => {
  let controller: SchedulesUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesUsersController],
    }).compile();

    controller = module.get<SchedulesUsersController>(SchedulesUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
