import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/api/history.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  newHistory!: number;
  socket: any;
  constructor(private hs: HistoryService) { 
    this.socket= io.io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.getNewHistory();
    this.socket.on('history',()=>{
      this.getNewHistory();
    });
  }

  getNewHistory(){
    this.hs.getUnseenCount().subscribe((res: any)=>{
      this.newHistory= res.count;
    })
  }

}
