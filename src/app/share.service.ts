import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  public bSubject$ = new BehaviorSubject('Default Value');
  public Subject$ = new Subject();
  

  constructor() { }

  

  sendText(data :any){
      this.Subject$.next(data);
      this.bSubject$.next(data);
  }


}


