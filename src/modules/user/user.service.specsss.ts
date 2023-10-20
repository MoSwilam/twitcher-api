import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRepository } from './entities/user.entity';
import { HttpClientService } from '../../shared/http/http.service';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'test@gmail.com'
  }

  const userRepositoryMock = {
    findOne: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn(),
    save: jest.fn(),
    // Add other methods as needed for your tests
  };

  const httpClientServiceMock = {
    request: jest.fn(),
    // Add other methods as needed for your tests
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: HttpClientService,
          useValue: httpClientServiceMock,
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock
        },
        {
          provide: EventEmitter2,
          useValue: new EventEmitter2(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('getUserById', async () => {

  // })
    // let userId: number;

    // beforeEach(() => {
    //   userId = 1;
    // });

    // it('should return a user with the given id', async () => {
    //   const user = await service.getUserById(userId);
    //   expect(user.id).toEqual(userId);
    // });

    // it('should throw an error if the user does not exist', async () => {
    //   userId = 999;
    //   await expect(service.getUserById(userId)).rejects.toThrow();
    // });


  // describe('UserService', () => {
  //   let service: UserService;

  //   beforeEach(async () => {
  //     const module: TestingModule = await Test.createTestingModule({
  //       providers: [UserService],
  //     }).compile();

  //     service = module.get<UserService>(UserService);
  //   });

  //   describe('getUserById', () => {
  //     it('should return a user with the given id', async () => {
  //       const user = await service.getUserById(1);
  //       expect(user.id).toEqual(1);
  //     });

  //     it('should throw an error if the user does not exist', async () => {
  //       await expect(service.getUserById(999)).rejects.toThrow();
  //     });
  //   });
  // });
});

