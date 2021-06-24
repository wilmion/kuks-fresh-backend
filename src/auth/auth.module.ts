import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@root/users/users.module';

import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

import { AuthEntity, AuthSchema } from './entities/auth.entity';
import { UsersEntity, UsersSchema } from '@root/users/entity/users.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthEntity.name,
        schema: AuthSchema,
      },
      {
        name: UsersEntity.name,
        schema: UsersSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
