import { Body, Controller, Post, Response as Res } from '@nestjs/common';
import { Response } from 'express';

import { setResponse } from '@core/response/index';

import { UsersServiceService } from '../services/users-service.service';

import { CreateUsers } from '../dtos/users.dto';

@Controller('users')
export class UsersControllerController {
  constructor(private usersService: UsersServiceService) {}

  @Post('/register')
  async register(@Res() res: Response, @Body() payload: CreateUsers) {
    try {
      const data = await this.usersService.create(payload);

      setResponse(res, data, 201);
    } catch (e) {
      setResponse(res, null, 500, 'Internal Server Error');
    }
  }
}
