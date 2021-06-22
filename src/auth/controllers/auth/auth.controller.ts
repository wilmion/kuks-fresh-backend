import { Body, Controller, Post, Response as Res } from '@nestjs/common';
import { Response } from 'express';

import { setResponse } from '@core/response/index';
import { AuthService } from '@root/auth/services/auth/auth.service';
import { CreateAuthDto } from '@root/auth/dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: CreateAuthDto, @Res() res: Response) {
    try {
      const data = await this.authService.login(body.email, body.password);

      setResponse(res, data, 200);
    } catch (e: any) {
      console.log(e.message);
      setResponse(res, null, 500, 'You can not do this');
    }
  }
}