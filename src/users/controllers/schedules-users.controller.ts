import {
  Body,
  Controller,
  Param,
  Patch,
  Response as Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { Response } from 'express';

//guadians
import { JwtGuard } from '@core/guards/jwt.guard';
import { RolesGuard } from '@core/guards/roles.guard';

import { Role } from '@core/decorators/roles.decorator';

import { RoleE } from '@core/enums/role.enum';

import { setResponse } from '@core/response';

import { UpdateSchedulesUsersDto } from '../dtos/schedulesUsers.dto';

import { SchedulesUsersService } from '../services/schedules-users.service';

@ApiTags('Schedules Users')
@Controller('schedules-users')
@UseGuards(JwtGuard, RolesGuard)
export class SchedulesUsersController {
  constructor(private scheduleUsersService: SchedulesUsersService) {}

  @Role(RoleE.ADMIN, RoleE.SUPERADMIN)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Schedule Updated',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async updateScheduleUser(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: UpdateSchedulesUsersDto,
  ) {
    try {
      const data = await this.scheduleUsersService.updateSchedule(id, payload);

      setResponse(res, data, 200);
    } catch (e: any) {
      setResponse(res, null, 500, 'Internal server Error');
    }
  }
}
