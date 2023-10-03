import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { userStub } from './stubs';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpClientService } from '../../../shared/http/http.service';
import { HttpClientModule } from '../../../shared/http/http.module';
import { of } from 'rxjs';

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
            save: jest.fn().mockResolvedValue(fakeUser),
            create: jest.fn().mockReturnValue(fakeUser),
            find: jest.fn().mockResolvedValue([fakeUser]),
            update: jest.fn().mockResolvedValue(fakeUser),
          },
        },

      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  it('should find user by id', () => {
    expect(userService.findOne(1)).resolves.toEqual(fakeUser);
  });
});
