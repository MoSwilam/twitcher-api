import { User } from "../entities/user.entity"

export const userStub = (): Partial<User> => {
  const user: Partial<User> = {
     id: 1,
     name: 'dude',
     country: 'Portugal',
     email: 'mo91sw@gmail.com',
     age: 32,
  }
  return user;
}