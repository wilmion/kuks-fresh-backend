import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

import { AuthEntity, AuthSchema } from './entities/auth.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthEntity.name,
        schema: AuthSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
