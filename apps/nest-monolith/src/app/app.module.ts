import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesGateway } from './messages.gateway';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MessagesGateway,
  ]
})
export class AppModule {}
