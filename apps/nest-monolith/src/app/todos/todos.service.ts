import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private todoModel: Model<Todo>) {}

  async findAll() {
    return this.todoModel.find().exec();
  }

  find(id: string) {}

  create(todo: Todo) {}

  update(todo: Partial<Todo>) {}

  remove(id) {}
}
