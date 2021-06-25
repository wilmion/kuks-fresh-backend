import {
  //Body,
  Controller,
  Patch,
  Response as Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { JwtGuard } from '@core/guards/jwt.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { IdentifyUserGuard } from '@core/guards/identify-user.guard';

import { AlsoAdmin } from '@core/decorators/alsoAdmin.decorator';
import { Role } from '@core/decorators/roles.decorator';

import { setResponse } from '@core/response/index';

import { UsersServiceService } from '../services/users-service.service';
import { RoleE } from '@core/enums/role.enum';

@Controller('users')
@UseGuards(JwtGuard, RolesGuard, IdentifyUserGuard)
export class UsersControllerController {
  constructor(private usersService: UsersServiceService) {}

  @Role(RoleE.CLIENT, RoleE.ADMIN)
  @AlsoAdmin()
  @Patch('/:id')
  updateUser(@Res() res: Response) {
    setResponse(res, [], 200);
  }
}
