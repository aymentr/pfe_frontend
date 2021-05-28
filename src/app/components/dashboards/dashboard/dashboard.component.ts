import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/services/api/auth.service';
import { LineService } from 'src/app/services/api/line.service';
import { AddLineComponent } from '../../dialogs/add-line/add-line.component';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['ressource', 'operation', 'designation'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isNotUser= false;
  socket: any;
  constructor(private lineSrv: LineService, private dialog: MatDialog, private auth: AuthService) { 
    this.auth.getRole().subscribe((res: any)=>{
      this.isNotUser= res.role !=="user";
    });
    this.socket= io.io('http://localhost:3000');
  }


  ngOnInit(): void {
    this.getLines();
    this.socket.on('line_added', ()=>{
      this.getLines();
    });
    this.socket.on('line_deleted', ()=>{
      this.getLines();
    });
  }

  getLines(){
    this.lineSrv.getLines().subscribe((res: any)=>{
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

  openDialog(){
    this.dialog.open(AddLineComponent);
  }



}

