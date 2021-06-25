import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUsersDto } from '../dtos/users.dto';

import { UsersEntity } from '../entity/users.entity';

@Injectable()
export class UsersServiceService {
  constructor(
    @InjectModel(UsersEntity.name)
    private usersModel: Model<UsersEntity>,
  ) {}

  async getUser(email: string) {
    const user = await this.usersModel
      .findOne({ email })
      .populate('shedules')
      .exec();

    return user;
  }

  async updateUser(id: string, payload: UpdateUsersDto) {
    const user = await this.usersModel.findById(id);

    const changes: UpdateUsersDto = {
      ...payload,
      admin: payload.admin !== null ? false : user.admin,
    };

    await this.usersModel
      .findByIdAndUpdate(id, { $set: changes, new: true })
      .exec();

    return 'Updated!';
  }
  async deleteUser(id: string) {
    await this.usersModel.findByIdAndRemove(id);
    return 'Deleted User';
  }
}
