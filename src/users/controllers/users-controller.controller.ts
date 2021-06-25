import {
  Body,
  Controller,
  Delete,
  Param,
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

import { UpdateProductDto } from '@root/products/dtos/products.dto';

@Controller('users')
@UseGuards(JwtGuard, RolesGuard, IdentifyUserGuard)
export class UsersControllerController {
  constructor(private usersService: UsersServiceService) {}

  @Role(RoleE.CLIENT, RoleE.ADMIN)
  @AlsoAdmin()
  @Patch('/:id')
  async updateUser(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: UpdateProductDto,
  ) {
    try {
      const data = await this.usersService.updateUser(id, payload);
      setResponse(res, data, 200);
    } catch (e: any) {
      console.log(e);
      setResponse(res, null, 500, 'Internal server Error');
    }
  }

  @Role(RoleE.CLIENT, RoleE.ADMIN)
  @AlsoAdmin()
  @Delete('/:id')
  async deleteUser(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.usersService.deleteUser(id);
      setResponse(res, data, 200);
    } catch (e: any) {
      console.log(e);
      setResponse(res, null, 500, 'Internal server Error');
    }
  }
}
