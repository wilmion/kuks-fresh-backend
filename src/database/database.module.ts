import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, user, password, port, name } = configService.database;

        return {
          uri: `${host}${port}`,
          user,
          pass: password,
          dbName: name,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { host, user, password, port, name } = configService.database;
        const uri = `${host}${user}:${password}${port}`;
        const client = new MongoClient(uri, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });
        await client.connect();
        const database = client.db(name);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
