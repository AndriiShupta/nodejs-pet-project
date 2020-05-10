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

  async create(todo: Pick<Todo, 'content'>) {
    return this.todoModel.create({ ...todo, state: 'initial' });
  }

  update(todo: Partial<Todo>) {}

  async remove(_id) {
    return this.todoModel.deleteOne({ _id }).exec();
  }
}
