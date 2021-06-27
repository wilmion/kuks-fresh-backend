import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SchedulesTimesModule } from './schedules-times/schedules-times.module';

import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_NAME: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
    AuthModule,
    SchedulesTimesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
