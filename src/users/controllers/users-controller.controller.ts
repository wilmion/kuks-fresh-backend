import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from '../../config';

@Controller('users')
export class UsersControllerController {
  constructor(@Inject(config.KEY) private conf: ConfigType<typeof config>) {}

  @Get('')
  test() {
    return {
      message: this.conf.database.password,
    };
  }
}
