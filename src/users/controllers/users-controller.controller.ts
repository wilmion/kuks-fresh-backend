import {
  //Body,
  Controller,
  Patch,
  Response as Res,
  //UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { setResponse } from '@core/response/index';

import { UsersServiceService } from '../services/users-service.service';

@Controller('users')
//@UseGuards(Guard)
export class UsersControllerController {
  constructor(private usersService: UsersServiceService) {}

  @Patch('/')
  updateUser(@Res() res: Response) {
    setResponse(res, [], 200);
  }
}
