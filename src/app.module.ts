import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CatModule } from './modules/cat/cat.module';
import { DogModule } from './modules/dog/dog.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/shared/config/env/${
                process.env.NODE_ENV
      }.env`,
      isGlobal: true,
    }),
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
    CatModule,
    DogModule,
    UserModule
  ]
})
export class AppModule {}
