import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CatModule } from './modules/cat/cat.module';
import { DogModule } from './modules/dog/dog.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/shared/config/env/${
        process.env.NODE_ENV
      }.env`,
      isGlobal: true,
    }),
    HttpModule,
    CatModule,
    DogModule,
    UserModule
  ]
})
export class AppModule {}
