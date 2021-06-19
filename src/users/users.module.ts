import { Module } from '@nestjs/common';
import { UsersServiceService } from './services/users-service.service';
import { UsersControllerController } from './controllers/users-controller.controller';

@Module({
  controllers: [UsersControllerController],
  providers: [UsersServiceService],
})
export class UsersModule {}
