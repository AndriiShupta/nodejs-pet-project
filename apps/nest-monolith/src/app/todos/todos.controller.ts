import {
  Controller,
  Delete,
  Get,
  Post,
  Put
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {
  }

  @Get()
  async findAll() {
    return this.todosService.findAll();
  }

  @Post()
  add(body) {

  }

  @Put()
  update(body) {

  }

  @Delete()
  remove(body) {

  }
}
