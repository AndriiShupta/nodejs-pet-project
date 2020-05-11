import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';

import { Message } from '@nodejs-playground/api-interfaces';

import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Post('flipper')
  @UseInterceptors(FileInterceptor('file'))
  async flipImage(@UploadedFile() file) {
    return this.appService.flipImage(file).then(base64 => ({ base64 }));
  }
}
