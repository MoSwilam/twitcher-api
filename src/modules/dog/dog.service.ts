import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { HttpClientService } from 'src/shared/http/http.service';
import { HttpMethod, IRequestPayload } from 'src/shared/constants';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class DogService {

  findAll() {
    return `This action returns all dog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dog`;
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return `This action updates a #${id} dog`;
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }

  @OnEvent('user.created')
  async handleUserCreatedEvent(user) {
    console.log('Event triggered: User created', user);
  }
}
