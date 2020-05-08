import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {
  map,
  scan,
  startWith,
  takeUntil,
  tap
} from 'rxjs/operators';
import { Message } from '@nodejs-pet-project/api-interfaces';
import {
  merge,
  of,
  Subject
} from 'rxjs';

@Component({
  selector: 'nodejs-pet-project-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit, OnDestroy {
  $ngDestroy = new Subject();

  logs$ = merge(
    of({ message: 'Connecting...' }).pipe(tap(() => this.socket.emit('logs'))),
    this.socket.fromEvent('logs'),
  ).pipe(
    map((message: Message) => `Nodejs-Pet-Project:~ fakeuser$ ${ message.message }`),
    scan((acc: string[], curr: string = 'curr') => {
      console.log('Current acc: ', acc);
      console.log('Current value: ', curr);
      return acc.length === 100
          ? acc.slice(50, 99).concat([curr])
          : acc.concat([curr || 'curr'])
      },
      []
    ),
    takeUntil(this.$ngDestroy),
  );

  lastLogin = new Date();

  constructor(
    private socket: Socket,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.$ngDestroy.next();
  }

}
