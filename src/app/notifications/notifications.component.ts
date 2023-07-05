import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  getCurrentText : any;
  getDefaultText : any;

  constructor(private notificationService : ShareService){}
  ngOnInit(): void {
    this.notificationService.Subject$.subscribe(data=>{
      this.getCurrentText = data ;
    })
    this.notificationService.bSubject$.subscribe(data=>{
      this.getDefaultText = data ;
    })
  }
}
