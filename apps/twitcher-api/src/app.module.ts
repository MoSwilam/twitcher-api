import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/apps/twitcher-api/src/shared/config/env/${
        process.env.NODE_ENV
      }.env`,
      isGlobal: true,
      //validationSchema: Joi
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      // host: 'localhost',
      // port: 5432,
      // username: 'admin',
      // password: 'admin',
      // database: 'twitcher_db',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    HttpModule,
    UserModule
  ]
})
export class AppModule {}
