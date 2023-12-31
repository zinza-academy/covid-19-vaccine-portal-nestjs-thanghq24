import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [
    configService.get('NODE_ENV') === 'production'
      ? 'dist/src/entities/*.entity.js'
      : 'src/entities/*.entity{.ts,.js}',
  ],
  migrations: [
    configService.get('NODE_ENV') === 'production'
      ? 'dist/migrations/*.js'
      : 'migrations/*{.ts,.js}',
  ],
  namingStrategy: new SnakeNamingStrategy(),
});
