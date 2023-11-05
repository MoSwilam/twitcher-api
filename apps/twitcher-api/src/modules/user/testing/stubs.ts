import { User } from "../entities/user.entity"

export const userStub = (): Partial<User> => {
  const user: Partial<User> = {
     name: 'dude',
     country: 'Portugal',
     email: 'mo91s1w@gmail.com',
     password: '123456',
     age: 32,
  }
  return user;
}