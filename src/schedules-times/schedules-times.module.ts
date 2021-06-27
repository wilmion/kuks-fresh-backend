import { Module } from '@nestjs/common';
import { SchedulesTimesService } from './services/schedules-times.service';
import { SchedulesTimesController } from './controllers/schedules-times.controller';

@Module({
  providers: [SchedulesTimesService],
  controllers: [SchedulesTimesController],
})
export class SchedulesTimesModule {}
