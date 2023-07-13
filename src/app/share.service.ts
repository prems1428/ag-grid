import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  api1 = 'https://www.ag-grid.com/example-assets/small-olympic-winners.json';
  constructor(private http : HttpClient) { }

  getData(){
    return this.http.get(this.api1);
  }
}
