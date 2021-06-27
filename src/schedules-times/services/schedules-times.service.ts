import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateScheduleTimeDto,
  UpdateScheduleTimeDto,
} from '../dtos/scheduleTimes.dto';

import { ScheduleTimes, DaysT } from '../entities/schedule-times.entity';

@Injectable()
export class SchedulesTimesService {
  constructor(
    @InjectModel(ScheduleTimes.name)
    private scheduleTimeModel: Model<ScheduleTimes>,
  ) {}
  async getAll() {
    const schdlsts = await this.scheduleTimeModel.find().exec();

    return schdlsts;
  }

  async getByDay(day: DaysT) {
    const scheduleTime = await this.scheduleTimeModel.findOne({ day }).exec();

    return scheduleTime;
  }

  async create(payload: CreateScheduleTimeDto) {
    const schdlsts = await this.getAll();

    // Comienzo de la validación si es un día
    const daysReserved: Array<DaysT> = [];
    const days: Array<DaysT> = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thrusday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    let isDay = false;
    for (const day of days) {
      if (payload.day === day) {
        isDay = true;
      }
      for (const schedule of schdlsts) {
        if (schedule.day === day) {
          daysReserved.push(schedule.day);
        }
      }
    }

    if (!isDay) throw new Error('No es un día');

    for (const day of daysReserved) {
      if (day === payload.day) {
        throw new Error('Este dia ya esta definido');
      }
    }
    // Final de la validación si es un día

    const shdlT = new this.scheduleTimeModel(payload);
    await shdlT.save();

    return 'Schedule Create';
  }

  async update(id: string, payload: UpdateScheduleTimeDto) {
    await this.scheduleTimeModel.findByIdAndUpdate(id, {
      $set: payload,
      new: true,
    });
    return 'Schedule time updated';
  }

  async delete(id: string) {
    await this.scheduleTimeModel.findByIdAndRemove(id);
    return 'Schedule Time removed';
  }
}
