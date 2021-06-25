import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { UsersEntity } from '@root/users/entity/users.entity';
import { AuthEntity } from '../../entities/auth.entity';
import { CreateAuthDto } from '../../dtos/auth.dto';
import { CreateUsers } from '@root/users/dtos/users.dto';

import { RoleI } from '@core/models/role.model';

import { UsersServiceService } from '@root/users/services/users-service.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthEntity.name) private authModel: Model<AuthEntity>,
    @InjectModel(UsersEntity.name) private usersModel: Model<UsersEntity>,
    private usersService: UsersServiceService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const isValid = await this.validateUser(email, password);

    if (!isValid) throw new Error('Not user');

    const userFull = await this.usersService.getUser(email);

    const payload: RoleI = {
      role: userFull.admin ? 'admin' : 'client',
      id: userFull.id,
    };

    const token: string = await this.jwtService.signAsync(payload);

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

  async validateUser(email: string, password: string) {
    const user = await this.authModel.findOne({ email: email }).exec();

    if (!user) return false;

    const isUser = await bcrypt.compare(password, user.password);

    return isUser;
  }
}
