import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  async add(@Body() body) {
    return this.todosService.create(body);
  }

  @Put()
  update(body) {

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
