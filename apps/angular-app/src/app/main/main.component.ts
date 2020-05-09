import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'angular-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  todos$ = this.httpClient.get('api/todos');

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

}
