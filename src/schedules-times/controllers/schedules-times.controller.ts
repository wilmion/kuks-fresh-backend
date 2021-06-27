import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Response as Res,
} from '@nestjs/common';

import { JwtGuard } from '@core/guards/jwt.guard';
import { RolesGuard } from '@core/guards/roles.guard';

import { Public } from '@core/decorators/public.decorator';
import { Role } from '@core/decorators/roles.decorator';

import { RoleE } from '@core/enums/role.enum';

import { Response } from 'express';
import { DaysT } from '../entities/schedule-times.entity';

import { setResponse } from '@core/response';

import { SchedulesTimesService } from '../services/schedules-times.service';
import {
  CreateScheduleTimeDto,
  UpdateScheduleTimeDto,
} from '../dtos/scheduleTimes.dto';

@Controller('schedules-times')
@UseGuards(JwtGuard, RolesGuard)
export class SchedulesTimesController {
  constructor(private scheduleTimes: SchedulesTimesService) {}

  @Public()
  @Get('/')
  async getAll(@Res() res: Response) {
    try {
      const data = await this.scheduleTimes.getAll();
      setResponse(res, data, 200);
    } catch (e) {
      setResponse(res, null, 500, 'Internal Server Error');
    }
  }

  @Public()
  @Get('/:day')
  async getByDay(@Res() res: Response, @Param('day') day: DaysT) {
    try {
      const data = await this.scheduleTimes.getByDay(day);
      setResponse(res, data, 200);
    } catch (e) {
      setResponse(res, null, 500, 'Internal Server Error');
    }
  }

  @Role(RoleE.ADMIN, RoleE.SUPERADMIN)
  @Post('/')
  async create(@Res() res: Response, @Body() payload: CreateScheduleTimeDto) {
    try {
      const data = await this.scheduleTimes.create(payload);
      setResponse(res, data, 201);
    } catch (e) {
      console.log(e);
      setResponse(res, null, 500, 'Internal Server Error');
    }
  }

  @Role(RoleE.ADMIN, RoleE.SUPERADMIN)
  @Patch('/:id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: UpdateScheduleTimeDto,
  ) {
    try {
      const data = await this.scheduleTimes.update(id, payload);
      setResponse(res, data, 200);
    } catch (e) {
      console.log(e);
      setResponse(res, null, 500, 'Internal Server Error');
    }
  }

  @Role(RoleE.ADMIN, RoleE.SUPERADMIN)
  @Delete('/:id')
  async delete(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.scheduleTimes.delete(id);
      setResponse(res, data, 200);
    } catch (e) {
      setResponse(res, null, 500, 'Internal Server Error');
    }
  }
}
