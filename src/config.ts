import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME || 'kuks-fresh',
      host: process.env.DATABASE_HOST || '',
      user: process.env.DATABASE_USER || '',
      password: process.env.DATABASE_PASSWORD || '',
      port: process.env.DATABASE_PORT || '',
    },
  };
});
