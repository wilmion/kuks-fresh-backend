import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { generate } from '@core/utils/JWT';

import { UsersEntity } from '@root/users/entity/users.entity';
import { AuthEntity } from '../../entities/auth.entity';
import { CreateAuthDto } from '../../dtos/auth.dto';
import { CreateUsers } from '@root/users/dtos/users.dto';
import { Model } from 'mongoose';

import { UsersServiceService } from '@root/users/services/users-service.service';
import { generatePermisions } from '@core/utils/generatePermisions';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthEntity.name) private authModel: Model<AuthEntity>,
    @InjectModel(UsersEntity.name) private usersModel: Model<UsersEntity>,
    private usersService: UsersServiceService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.authModel.findOne({ email: email }).exec();

    if (!user) throw new Error('Is email not exist');

    const isUser = await bcrypt.compare(password, user.password);

    if (!isUser) throw new Error('Not user');

    const userFull = await this.usersService.getUser(email);

    const token: string = await generate(
      generatePermisions(userFull.admin, userFull.email),
      'secret',
      1,
    );

    const data = {
      token,
      user: userFull,
    };

    return data;
  }

  async register(payload: CreateUsers) {
    try {
      const { password, ...user } = payload as any;

      user.admin = false;

      await this.registerInAuth(user.email, password);

      const newUser = new this.usersModel(user);
      await newUser.save();

      return '¡Register Success!';
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async registerInAuth(email: string, password: string) {
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
