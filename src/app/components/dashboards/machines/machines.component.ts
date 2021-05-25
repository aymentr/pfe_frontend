import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MachineService } from 'src/app/services/api/machine.service';
import { UpdateMachineComponent } from '../../update-machine/update-machine.component';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {

  displayedColumns: string[] = ['ressource', 'operation', 'designation'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id: string;
  constructor(private route: ActivatedRoute, private machine: MachineService, private dialog: MatDialog) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.machine.getMachines(this.id).subscribe((res:any)=>{
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

  openDialog(id : string) {
    this.dialog.open(UpdateMachineComponent, {
      data: {
        id: id
      }
    });
  }


}
