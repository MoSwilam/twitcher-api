import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, { provide: UserService, useValue: {} }],
    }).compile();
    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});