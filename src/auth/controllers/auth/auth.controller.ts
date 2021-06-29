import {
  Body,
  Controller,
  Post,
  Response as Res,
  Request,
  Delete,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { Response } from 'express';

import { setResponse } from '@core/response/index';

import { CreateAuthDto } from '@root/auth/dtos/auth.dto';
import { CreateUsers } from '@root/users/dtos/users.dto';
import { ChangePasswordBody, ChangeEmailBody } from '@core/doc/schema/auth';

import { JwtGuard } from '@core/guards/jwt.guard';
import { RolesGuard } from '@core/guards/roles.guard';

import { Public } from '@core/decorators/public.decorator';
import { Role } from '@core/decorators/roles.decorator';

import { RoleI } from '@core/models/role.model';

import { RoleE } from '@core/enums/role.enum';

import { AuthService } from '@root/auth/services/auth/auth.service';

@ApiTags('Authentication')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@Controller('auth')
@UseGuards(JwtGuard, RolesGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiResponse({
    status: 200,
    description: '{ token: String , user: CreateUsers }',
  })
  async login(@Body() body: CreateAuthDto, @Res() res: Response) {
    try {
      const data = await this.authService.login(body.email, body.password);

      setResponse(res, data, 200);
    } catch (e: any) {
      console.log(e.message);
      setResponse(res, null, 500, 'You can not do this');
    }
  }

  @Public()
  @Post('/register')
  @ApiResponse({ status: 201, description: '¡Register Success!' })
  async register(@Body() body: CreateUsers, @Res() res: Response) {
    try {
      const data = await this.authService.register(body);

      setResponse(res, data, 201);
    } catch (e) {
      console.log(e);
      setResponse(res, null, 500, 'Internal Server Error');
    }
  }

  @Patch('change-password')
  @ApiBearerAuth()
  @ApiBody({ type: ChangePasswordBody })
  @ApiResponse({ status: 200, description: 'Changed Password' })
  async change_pass(@Res() res: Response, @Request() req: any) {
    try {
      const token: RoleI = req.user;
      const data = await this.authService.changePassword(
        token.id,
        req.body.password,
      );
      setResponse(res, data, 200);
    } catch (e: any) {
      console.log(e);
      setResponse(res, null, 500, 'Internal server Error');
    }
  }

  @Patch('change-email')
  @ApiBearerAuth()
  @ApiBody({ type: ChangeEmailBody })
  @ApiResponse({ status: 200, description: 'Email Changed' })
  async change_email(@Res() res: Response, @Request() req: any) {
    try {
      const token: RoleI = req.user;
      const data = await this.authService.changeEmail(token.id, req.body.email);
      setResponse(res, data, 200);
    } catch (e: any) {
      console.log(e);
      setResponse(res, null, 500, 'Internal server Error');
    }
  }

  @Role(RoleE.ADMIN, RoleE.SUPERADMIN)
  @Delete('/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Account Removed' })
  async deleteUser(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.authService.removeUser(id);
      setResponse(res, data, 200);
    } catch (e: any) {
      console.log(e);
      setResponse(res, null, 500, 'Internal server Error');
    }
  }
}
