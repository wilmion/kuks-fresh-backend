import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@root/auth/auth.module';

import { UsersEntity as Users, UsersSchema } from './entity/users.entity';
import {
  SchedulesUsersEntity as SchedulesUsers,
  SchedulesUsersSchema,
} from './entity/SchedulesUsers.entity';

import { UsersServiceService } from './services/users-service.service';
import { UsersControllerController } from './controllers/users-controller.controller';
import { SchedulesUsersService } from './services/schedules-users.service';

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
    AuthModule,
  ],
  controllers: [UsersControllerController],
  providers: [UsersServiceService, SchedulesUsersService],
})
export class UsersModule {}
