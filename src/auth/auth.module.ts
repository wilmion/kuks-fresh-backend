import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@root/users/users.module';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

import { JWTStrategy } from '@core/strategies/jwt.strategy';

import config from '@root/config';
import { ConfigType } from '@nestjs/config';

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
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwt.secret,
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
