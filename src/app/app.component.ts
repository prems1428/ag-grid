import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, filter } from 'rxjs';

import {ajax} from "rxjs/ajax"
import { ShareService } from './share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'Test';


  constructor(private http : HttpClient,private appService : ShareService){}

  ngOnInit(){
    // this.rowsData$ = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');

    // const promise = new Promise(resolve=>{
    //   console.log('Promise call....');
    //   setTimeout(()=>{
    //     resolve(Math.random());
    //     resolve(Math.random());
    //     resolve('Promise Working1');
    //     resolve('Promise Working2');
    //   },1000)
    // });
    // promise.then(result=>{ console.log(result)});

    // const observable$ = new Observable(sub=>{
    //   console.log('Observable call....');
    //   let count = 0;
    //   setInterval(()=>{
    //     count = count + 1;
    //     sub.next(count);
    //     sub.next('Observable Working');
    //     sub.next('Observable Working1');
    //     sub.next('Observable Working2');
    //   },1000);
    // });
    // observable$.subscribe(result=>{console.log("Subscribe count is "+ result)})
    
    // const subject = new Subject();

    // subject.subscribe(data=>{console.log(data);})
    // subject.subscribe(data=>{console.log(data);})

    // subject.next(Math.random());

    // const subject = new Subject();
    // const data = ajax('https://jsonplaceholder.typicode.com/users');

    // subject.subscribe(data=>{console.log(data)});
    // subject.subscribe(data=>{console.log(data)});

    // const result = data.subscribe(subject);

    // const bSubject = new BehaviorSubject(34);

    // bSubject.subscribe(d=>{console.log(`Behavior subject 1 is ${d}`)})

    // bSubject.next(43);

    // bSubject.subscribe(d=>{console.log(`Behavior subject 2 is ${d}`)})

    // const $replaySubject = new ReplaySubject(3);
    
    // $replaySubject.next('Hello....');
    // $replaySubject.next('Hiii....');
    // $replaySubject.next('Welcome....');
    // $replaySubject.next('greetings....');

    // $replaySubject.subscribe(data=>{
    //   console.log(`user ! ${data}`);
    // })

    // $replaySubject.next('Stay safe....');
    // $replaySubject.next('Stay home....');

    // $replaySubject.subscribe(data=>{
    //   console.log(`user ! ${data}`);
    // })
    
    // const asynSubject$ = new AsyncSubject();

    // asynSubject$.next("value 1");
    // asynSubject$.next("value 2");
    // asynSubject$.next("value 3");
    // asynSubject$.next("value 4");
    // asynSubject$.complete();
   

    // asynSubject$.subscribe(data=>{
    //   console.log(`user 1 ${data}`);
    // })

  
   
  }

  // onCellCliked(event : CellClickedEvent){

  //   console.log(event);
  // }

  // onClear(){
  //   this.agGrid.api.deselectAll();
  // }
  // ngOnDestroy(): void {
  //   this.mySubscription?.unsubscribe();
  // }

  onTextSubmit(textData : any){
    this.appService.sendText(textData);
    this.appService.sendText(textData)
    console.log(textData);
    
    
  }
}


