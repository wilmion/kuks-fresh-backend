import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersEntity as Users, UsersSchema } from './entity/users.entity';
import {
  SchedulesUsersEntity as SchedulesUsers,
  SchedulesUsersSchema,
} from './entity/SchedulesUsers.entity';

import { UsersServiceService } from './services/users-service.service';
import { UsersControllerController } from './controllers/users-controller.controller';
import { SchedulesUsersService } from './services/schedules-users.service';
import { SchedulesUsersController } from './controllers/schedules-users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
      {
        name: SchedulesUsers.name,
        schema: SchedulesUsersSchema,
      },
    ]),
  ],
  controllers: [UsersControllerController, SchedulesUsersController],
  providers: [UsersServiceService, SchedulesUsersService],
  exports: [UsersServiceService],
})
export class UsersModule {}
