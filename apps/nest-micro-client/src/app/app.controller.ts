import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('command')
  getSumCommand() {
    console.log('/command')
    return this.appService.sumMessage(1 , 2);
  }

  @Get('event')
  async getSumEvent() {
    console.log('/event')
    return this.appService.sumEvent(3 , 4);
  }
}
