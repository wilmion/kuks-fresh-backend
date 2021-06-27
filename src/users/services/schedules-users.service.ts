import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SchedulesUsersEntity } from '../entity/SchedulesUsers.entity';
import {
  CreateSchedulesUsers,
  UpdateSchedulesUsersDto,
} from '../dtos/schedulesUsers.dto';

@Injectable()
export class SchedulesUsersService {
  constructor(
    @InjectModel(SchedulesUsersEntity.name)
    private schedulesUsers: Model<SchedulesUsersEntity>,
  ) {}

  async create(scheduleUser: CreateSchedulesUsers, idUser: string) {
    const { from, to, totalHours, location, date } = scheduleUser;
    const newScheduleUser: CreateSchedulesUsers = {
      ...scheduleUser,
      identifiquerShop: `${idUser}${from}${to}${totalHours}${location.city}${location.country}${location.direction}${date.year}${date.month}${date.date}${date.day}`,
    };

    const isExist = await this.schedulesUsers
      .findOne({ identifiquerShop: newScheduleUser.identifiquerShop })
      .exec();

    if (isExist) {
      return isExist.id;
    }

    const schedule = new this.schedulesUsers(newScheduleUser);

    await schedule.save();

    return schedule.id;
  }

  async getSchedule(id: string) {
    const schedule = await this.schedulesUsers
      .findOne({ _id: id })
      .populate('products')
      .exec();

    return schedule;
  }

  async updateSchedule(id: string, changes: UpdateSchedulesUsersDto) {
    this.schedulesUsers
      .findByIdAndUpdate(id, { $set: changes, new: true })
      .exec();

    return `Schedule Updated`;
  }

  async delete(id: string) {
    await this.schedulesUsers.findByIdAndRemove(id);

    return 'Schedule Removed';
  }
}
