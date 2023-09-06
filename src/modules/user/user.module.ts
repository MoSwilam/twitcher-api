import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpClientModule } from '../../shared/http/http.module';

@Module({
  imports: [HttpClientModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
