import {
  Inject,
  Injectable
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}
  getData(): { message: string } {
    return { message: 'Welcome to nest-micro-client!' };
  }

  sumMessage(a, b) {
    return this.client.send({ cmd: 'sum' }, [a, b]);
  }

  sumEvent(a, b) {
    return this.client.emit('sum_event', [a, b]);
  }
}
