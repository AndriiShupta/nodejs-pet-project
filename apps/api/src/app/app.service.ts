import { Injectable } from '@nestjs/common';
import { Message } from '@nodejs-pet-project/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
