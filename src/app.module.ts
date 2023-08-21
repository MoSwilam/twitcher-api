import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './modules/cat/cat.module';
import { DogModule } from './modules/dog/dog.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/shared/config/env/${
        process.env.NODE_ENV
      }.env`,
      isGlobal: true,
    }),
    CatModule,
    DogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
