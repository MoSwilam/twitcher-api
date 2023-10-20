import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { userStub } from './stubs';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpClientService } from '../../../shared/http/http.service';
import { HttpClientModule } from '../../../shared/http/http.module';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcryptUtil from '../../../shared/bcrypt/bcrypt';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  /** MOCK ENTITIES */
  const fakeUser: Partial<User> = userStub();

  /** SERVICE FILES */
  let userService: UserService;
  let httpClientService: HttpClientService;

  /** REPOs */
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpClientModule],
      providers: [
        UserService,
        {
          provide: HttpClientService,
          useValue: httpClientService,
        },
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn().mockResolvedValue(fakeUser),
            save: jest.fn(),// .mockResolvedValue(fakeUser),
            create: jest.fn().mockReturnValue(fakeUser),
            find: jest.fn().mockResolvedValue([fakeUser]),
            update: jest.fn().mockResolvedValue(fakeUser),
          },
        },
        {
          provide: EventEmitter2,
          useValue: new EventEmitter2(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  describe('findOne', () => {
    it('should find user by id', () => {
      expect(userService.findOne(1)).resolves.toEqual(fakeUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
      await expect(userService.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  // describe('findAll', () => {
  //   it('should find all users', () => {
  //     expect(userService.findAll()).resolves.toEqual([fakeUser]);
  //   });
  // });

  describe('registerUser', () => {
    jest.spyOn(bcryptUtil, 'encodePassword').mockReturnValue('hashed123');

    it('should encode the password user', async () => {
      const customUser = { ...fakeUser, password: 'abc123' };

      console.log({ customUser })
      await userService.registerUser(customUser as any);
      expect(bcryptUtil.encodePassword).toHaveBeenCalledWith('abc123');

      const readyUser = { ...fakeUser, password: 'hashed123' };
      console.log({ readyUser })
      expect(userRepository.create).toHaveBeenCalledWith(customUser);
      expect(userRepository.create).toHaveBeenCalledWith(readyUser);
      // expect(userRepository.save).toHaveBeenCalledWith({ ...fakeUser, password: 'hashed123' });
    });

    it('call user repository.create with the correct params', async () => {
      await userService.registerUser(fakeUser as any);
      expect(userRepository.create).toHaveBeenCalledWith({ ...fakeUser, password: 'hashed123' });
    });

    it('call user repository.save with the correct params', async () => {
      await userService.registerUser(fakeUser as any);
      expect(userRepository.save).toHaveBeenCalledWith({ ...fakeUser, password: 'hashed123' });
    });
  });




  // describe('update', () => {
  //   it('should update user', async () => {
  //     const updateUserDto = { name: 'new name' };
  //     await userService.update(1, updateUserDto);
  //     expect(userRepository.update).toHaveBeenCalledWith(1, updateUserDto);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove user', async () => {
  //     await userService.remove(1);
  //     expect(userRepository.delete).toHaveBeenCalledWith(1);
  //   });
  // });
});

