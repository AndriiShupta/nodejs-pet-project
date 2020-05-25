import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import {
  EventPattern,
  MessagePattern
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'sum' })
  sum(payload: number[] = [1, 2, 3]) {
    return this.appService.accumulate(payload);
  }

  @EventPattern('sum_event')
  sum2(payload: number[] = [3, 4, 5]) {
    return this.appService.accumulate(payload);
  }
}
