import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpMethod, IRequestPayload } from '../../shared/constants';
import { HttpClientService } from '../../shared/http/http.service';

@Injectable()
export class UserService {
  constructor(private readonly httpsService: HttpClientService) {}

  async generateUser() {
    const url2 = 'https://dog.ceo/api/breeds/image/random';
    const url = 'https://randomuser.me/api/?results=2'

    const method = HttpMethod.GET;
    const requestPayload: IRequestPayload = {
      url,
      method,
    };
    const res = await this.httpsService.request(requestPayload);
    console.log({ res: res });
    return res;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
