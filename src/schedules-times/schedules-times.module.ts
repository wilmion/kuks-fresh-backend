import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SchedulesTimesService } from './services/schedules-times.service';

import { SchedulesTimesController } from './controllers/schedules-times.controller';

import { JWTStrategy } from '@core/strategies/jwt.strategy';

import {
  ScheduleTimes,
  ScheduleTimeSchema,
} from './entities/schedule-times.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ScheduleTimes.name,
        schema: ScheduleTimeSchema,
      },
    ]),
  ],
  providers: [SchedulesTimesService, JWTStrategy],
  controllers: [SchedulesTimesController],
})
export class SchedulesTimesModule {}
