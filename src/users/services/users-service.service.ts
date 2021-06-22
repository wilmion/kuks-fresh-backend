import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from '@root/auth/services/auth/auth.service';

import { UsersEntity } from '../entity/users.entity';
import { CreateUsers } from '../dtos/users.dto';

@Injectable()
export class UsersServiceService {
  constructor(
    @InjectModel(UsersEntity.name)
    private usersModel: Model<UsersEntity>,
    private authService: AuthService,
  ) {}

  async create(payload: CreateUsers) {
    try {
      const { password, ...user } = payload as any;

      user.admin = false;

      await this.authService.register(user.email, password);

      const newUser = new this.usersModel(user);
      await newUser.save();

      return '¡Register Success!';
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
