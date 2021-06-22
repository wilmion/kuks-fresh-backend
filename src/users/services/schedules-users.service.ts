import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SchedulesUsersEntity } from '../entity/SchedulesUsers.entity';
import { CreateSchedulesUsers } from '../dtos/schedulesUsers.dto';

@Injectable()
export class SchedulesUsersService {
  constructor(
    @InjectModel(SchedulesUsersEntity.name)
    private schedulesUsers: Model<SchedulesUsersEntity>,
  ) {}

  async create(scheduleUser: CreateSchedulesUsers) {
    const schedule = new this.schedulesUsers(scheduleUser);
    return schedule.save();
  }
}
