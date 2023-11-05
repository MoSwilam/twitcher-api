import * as bcrypt from 'bcrypt';

export function encodePassword(password: string): string {
  const saltRounds = bcrypt.genSaltSync(); // You can adjust the number of salt rounds for your needs
  return bcrypt.hashSync(password, saltRounds);
}