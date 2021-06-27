import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSchedulesUsers } from '../dtos/schedulesUsers.dto';
import { UpdateUsersDto } from '../dtos/users.dto';
import { SchedulesUsersEntity } from '../entity/SchedulesUsers.entity';

import { UsersEntity } from '../entity/users.entity';

import { SchedulesUsersService } from './schedules-users.service';

@Injectable()
export class UsersServiceService {
  constructor(
    @InjectModel(UsersEntity.name)
    private usersModel: Model<UsersEntity>,
    private schedulesUserService: SchedulesUsersService,
  ) {}

  async getUser(email: string) {
    const user: any = await this.usersModel.findOne({ email }).exec();

    const schedulesIds = user.shedules;
    const schedules: Array<SchedulesUsersEntity> = [];

    for (const id of schedulesIds) {
      const s = await this.schedulesUserService.getSchedule(id._id);
      schedules.push(s);
    }

    user.shedules = schedules;

    return user;
  }

  async updateUser(id: string, payload: any) {
    if (payload.shedules) {
      const schedules: CreateSchedulesUsers[] = payload.shedules as any;
      payload.shedules = [];

      for (const schedule of schedules) {
        const idNewSchedule: string = await this.schedulesUserService.create(
          schedule,
          id,
        );

        payload.shedules.push(idNewSchedule);
      }
    }
    const user = await this.usersModel.findById(id).exec();

    user.shedules.forEach((id: any) => {
      payload.shedules.forEach((idP) => {
        if (id._id == idP) {
          const i: number = payload.shedules.indexOf(idP);
          payload.shedules.splice(i, 1);
        }
      });
    });

    payload.shedules = [...user.shedules, ...payload.shedules];

    const changes: UpdateUsersDto = {
      ...payload,
      admin: payload.admin !== null ? false : user.admin,
    };

    await this.usersModel
      .findByIdAndUpdate(id, { $set: changes, new: true })
      .exec();

    return 'Updated!';
  }

  async toogleUserAdmin(admin: boolean, id: string) {
    const changes = {
      admin,
    };

    await this.usersModel
      .findByIdAndUpdate(id, {
        $set: changes,
        new: true,
      })
      .exec();

    return `User with ID: ${id} rigth now is admin`;
  }

  async deleteUser(email: string) {
    await this.usersModel.findOneAndRemove({ email }).exec();
    return 'Deleted User';
  }
}
