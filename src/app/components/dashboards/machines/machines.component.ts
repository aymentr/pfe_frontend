import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from 'src/app/services/api/machine.service';
import { UpdateMachineComponent } from '../../dialogs/update-machine/update-machine.component';
import * as io from "socket.io-client";
import { LineService } from 'src/app/services/api/line.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/api/auth.service';
import { AddMachineComponent } from '../../dialogs/add-machine/add-machine.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {

  displayedColumns: string[] = ['ressource', 'operation', 'server', 'mode'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id: string;
  socket: any;
  isSuperAdmin!: boolean;
  notFound= false;
  constructor(private route: ActivatedRoute, private machine: MachineService, private router: Router,
     private dialog: MatDialog, private lineSrv: LineService, private _snackBar: MatSnackBar, private auth: AuthService) { 
    this.id = this.route.snapshot.params.id;
    this.socket= io.io('ws://localhost:3000/');
    this.auth.getRole().subscribe((res: any)=>{
      this.isSuperAdmin= res.role ==="superadmin";
    });
  }

  ngOnInit(): void {
    this.getLine();
    this.getMachines();
    this.socket.on('machine_updated', ()=>{
      this.getMachines();
    });
    this.socket.on('machine_added', ()=>{
      this.getMachines();
    });
    this.socket.on('machine_deleted', ()=>{
      this.getMachines();
    });
  }

  getLine(){
    this.lineSrv.getLine(this.id).subscribe(res=>{
      if(res==null){
        this.notFound= true;
      }
    })
  }

  getMachines(){
    this.machine.getMachines(this.id).subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(machine : any) {
    this.dialog.open(UpdateMachineComponent, {
      data: machine
    });
  }

  openAddDialog(){
    this.dialog.open(AddMachineComponent, {
      data: this.id
    });
  }


  delete(){
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Line',
        message: 'Are you sure, you want to delete this Line and its machines?'
      }
    }).afterClosed().subscribe((confirm)=>{
      if(confirm){
        this.lineSrv.deleteLine(this.id).subscribe((res)=>{
          this.openDeleteSnackBar();
          this.router.navigate([".."]);
        });
      }
    });
  }
  openSnackBar() {
    this._snackBar.openFromComponent(LineSnackbarComponent, {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  openDeleteSnackBar() {
    this._snackBar.openFromComponent(DeleteLineSnackbarComponent, {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

}

@Component({
  selector: 'snack-bar-component-line-snack',
  template: `<span><span class="material-icons done">
  check_circle
  </span> Line updated successfully</span>`,
  styles: [`
    .done {
      color: #5cb85c;
      vertical-align: middle;
    }
  `],
})
export class LineSnackbarComponent {}

@Component({
  selector: 'snack-bar-component-line-snack',
  template: `<span><span class="material-icons done">
  delete
  </span> Line deleted successfully</span>`,
  styles: [`
    .done {
      color: #d9534f;
      vertical-align: middle;
    }
  `],
})
export class DeleteLineSnackbarComponent {}
