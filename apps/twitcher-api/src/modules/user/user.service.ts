import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpMethod, IRequestPayload } from '../../shared/constants';
import { HttpClientService } from '../../shared/http/http.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRepository } from './entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { encodePassword } from '../../shared/bcrypt/bcrypt';


@Injectable()
export class UserService {
  constructor(
      private readonly httpsService: HttpClientService,
      @InjectRepository(User)
      private readonly userRepository: UserRepository,
      private eventEmitter: EventEmitter2
    ) {}

  async registerUser(createUserDto: CreateUserDto) {
    // const userFound = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    // if (userFound) {
    //   throw new NotFoundException(`User with email ${createUserDto.email} already exists`);
    // }
    // console.log({ password: createUserDto.password  })
    createUserDto.password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create(createUserDto);
    const saved = this.userRepository.save(newUser);
    // this.eventEmitter.emit('user.created', saved);
    return saved;
  }

  async generateUser() {
    const url2 = 'https://dog.ceo/api/breeds/image/random';
    const url = 'https://randomuser.me/api/'

    const method = HttpMethod.GET;
    const requestPayload: IRequestPayload = {
      url,
      method,
    };
    const res = await this.httpsService.request(requestPayload);
    const [user] = res.results;

    const newUser = new User();
    newUser.name = user.name.first + ' ' + user.name.last;
    newUser.email = user.email;
    newUser.country = user.location.country;
    newUser.age = user.dob.age
    const saved = await this.userRepository.save(newUser);
    // this.eventEmitter.emit('user.created', saved);
    return saved;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
