import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
}
