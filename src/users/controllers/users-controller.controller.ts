import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Response as Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { Response } from 'express';

import { JwtGuard } from '@core/guards/jwt.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { IdentifyUserGuard } from '@core/guards/identify-user.guard';

import { AlsoAdmin } from '@core/decorators/alsoAdmin.decorator';
import { Role } from '@core/decorators/roles.decorator';

import { setResponse } from '@core/response/index';

import { UsersServiceService } from '../services/users-service.service';
import { RoleE } from '@core/enums/role.enum';

import { UpdateUsersDto } from '../dtos/users.dto';
import { UpdateUserBody } from '@core/doc/schema/UpdateUserBody';

@ApiTags('Users')
@ApiBearerAuth()
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@Controller('users')
@UseGuards(JwtGuard, RolesGuard, IdentifyUserGuard)
export class UsersControllerController {
  constructor(private usersService: UsersServiceService) {}

  @Role(RoleE.ADMIN, RoleE.SUPERADMIN)
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'CreateUsers[]',
  })
  async getAll(@Res() res: Response) {
    try {
      const data = await this.usersService.getAllUsers();
      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(res, null, 500, 'Internal server Error');
    }
  }

  @Role(RoleE.CLIENT, RoleE.ADMIN, RoleE.SUPERADMIN)
  @AlsoAdmin()
  @Patch('/:id')
  @ApiBody({ type: UpdateUserBody })
  @ApiResponse({
    status: 200,
    description: 'Updated!',
  })
  async updateUser(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: UpdateUsersDto,
  ) {
    try {
      const data = await this.usersService.updateUser(id, payload);
      setResponse(res, data, 200);
    } catch (e: any) {
      console.log(e);
      setResponse(res, null, 500, 'Internal server Error');
    }
  }

  @Role(RoleE.SUPERADMIN)
  @Patch('/convert-admin/:id')
  @ApiResponse({
    status: 200,
    description: 'User with ID: [id] rigth now is admin',
  })
  async convertToAdmin(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.usersService.toogleUserAdmin(true, id);
      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(res, null, 500, 'Internal server Error');
    }
  }

  @Role(RoleE.SUPERADMIN)
  @Patch('/remove-admin/:id')
  @ApiResponse({
    status: 200,
    description: 'User with ID: [id] rigth now is not admin',
  })
  async removeAdmin(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.usersService.toogleUserAdmin(false, id);
      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(res, null, 500, 'Internal server Error');
    }
  }
}
