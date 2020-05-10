import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  concatMap,
} from 'rxjs/operators';
import {
  BehaviorSubject,
} from 'rxjs';

@Component({
  selector: 'angular-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private $renew = new BehaviorSubject(true);

  todos$ = this.$renew.pipe(concatMap(() => this.httpClient.get('api/todos')));

  content = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {}

  addTodo() {
    this.httpClient.post(`api/todos`, { content: this.content }).subscribe(
      () => {
        this.content = '';
        this.$renew.next(true);
      },
    );
  }

  removeTodo(id) {
    this.httpClient.delete(`api/todos/${ id }`).subscribe(
      () => {
        this.content = '';
        this.$renew.next(true);
      },
    );
  }

}
