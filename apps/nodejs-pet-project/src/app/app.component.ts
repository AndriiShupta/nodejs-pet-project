import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@nodejs-pet-project/api-interfaces';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'nodejs-pet-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  socketHello$ = this.socket.fromEvent('messages');

  constructor(
    private http: HttpClient,
    private socket: Socket,
  ) {
    this.socket.emit('messages', 'msg');
  }
}
