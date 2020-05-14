import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'angular-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { id: 'imgFlipper', title: 'Image Flipper', cols: 2, rows: 1 },
        { id: 'express', title: 'Static Express', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  private $img = new BehaviorSubject(null);
  img$ = this.$img.asObservable();

  expressHealth$ = this.httpClient.get('express/health');

  file;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private httpClient: HttpClient,
  ) {}

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.file);

    this.httpClient.post<any>('api/flipper', formData).subscribe(
      (res) => {
        this.file = DataURIToBlob(res.base64);
        this.$img.next(res.base64);
      }
    );
  }

  onFileSelect(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.$img.next(e.target.result);
    }
    reader.readAsDataURL(this.file);
  }

  clear() {
    this.file = null;
    this.$img.next(null);
  }
}

function DataURIToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
    ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}
