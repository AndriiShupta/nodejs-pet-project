import { Injectable } from '@nestjs/common';
import Jimp from 'jimp';
import { Message } from '@nodejs-playground/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  async flipImage(file) {
    console.log(file)
    return Jimp.read(file.buffer).then(image => image.flip(true, false).getBase64Async(Jimp.AUTO));
  }
}
