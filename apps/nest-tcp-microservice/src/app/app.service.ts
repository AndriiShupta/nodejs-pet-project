import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to nest-tcp-microservice!' };
  }

  accumulate(payload: number[]) {
    return payload.reduce((c, n) => c + n, 0);
  }
}
