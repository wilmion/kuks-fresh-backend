import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';

import { AuthEntity } from '../../entities/auth.entity';
import { CreateAuthDto } from '../../dtos/auth.dto';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthEntity.name) private authModel: Model<AuthEntity>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.authModel.findOne({ email: email }).exec();

    if (!user) throw new Error('Is email not exist');

    const isUser = await bcrypt.compare(password, user.password);

    if (!isUser) throw new Error('Not user');

    return user;
  }

  async register(email: string, password: string) {
    const isExistOtherUser = await this.authModel
      .findOne({ email: email })
      .exec();

    if (isExistOtherUser) {
      throw new Error('');
    }

    const newPassword = await bcrypt.hash(password, 10);

    const data: CreateAuthDto = {
      email: email,
      password: newPassword,
    };

    const newAuthentication = new this.authModel(data);

    await newAuthentication.save();

    return true;
  }
}
