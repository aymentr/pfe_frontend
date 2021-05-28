import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryService } from 'src/app/services/api/history.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-update-history',
  templateUrl: './update-history.component.html',
  styleUrls: ['./update-history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UpdateHistoryComponent implements OnInit, OnDestroy {

  columnsToDisplay: string[] = ['table', 'operation', 'username', 'updatedAt'];
  dataSource!: MatTableDataSource<any>;
  expandedElement: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  socket:any;
  
  constructor(private hs: HistoryService) { 
    this.socket= io.io('http://localhost:3000');
  }
  ngOnDestroy(): void {
    this.hs.checkUseen();
  }

  ngOnInit(): void {
    this.getData();
    this.socket.on('history',()=>{
      this.getData();
    });
  }

  getData(){
    this.hs.getAll().subscribe((res: any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  date(date: any){
    return new Date(date).toLocaleString();
  }

}
