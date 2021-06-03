import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/api/auth.service';
import { MachineService } from 'src/app/services/api/machine.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.scss']
})
export class UpdateMachineComponent implements OnInit {

  role: string;
  machineForm: FormGroup;
  socket: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService, private dialog: MatDialog,
   private fb: FormBuilder, private machineSrv: MachineService, private _snackBar: MatSnackBar) { 
    this.role= this.auth.user.role;
    this.machineForm= this.fb.group({
      ressource: [this.data._id, Validators.required],
      server: [this.data.server, [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)]],
      operation: [this.data.operation, Validators.required],
      mode: [this.data.mode, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  save(){
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Update Machine',
        message: 'Are you sure, you want to update this Machine?'
      }
    }).afterClosed().subscribe((confirm)=>{
      if(confirm){
        this.machineSrv.updateMachine(this.data._id, this.machineForm.value).subscribe((res:any)=>{
          this.openSnackBar();
        });
      }
    });
    
  }
  
  delete(){
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Machine',
        message: 'Are you sure, you want to delete this Machine?'
      }
    }).afterClosed().subscribe((confirm)=>{
      if(confirm){
        this.machineSrv.deleteMachine(this.data._id).subscribe((res:any)=>{
          this.deleteSnackBar();
        });
      }
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(MachineSnackbarComponent, {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  deleteSnackBar(){
    this._snackBar.openFromComponent(DeleteMachineSnackbarComponent, {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

}

@Component({
  selector: 'snack-bar-component-machine-snack',
  template: `<span><span class="material-icons done">
  check_circle
  </span> Machine updated successfully</span>`,
  styles: [`
    .done {
      color: #5cb85c;
      vertical-align: middle;
    }
  `],
})
export class MachineSnackbarComponent {}

@Component({
  selector: 'snack-bar-component-machine-snack',
  template: `<span><span class="material-icons done">
  delete
  </span> Machine deleted successfully</span>`,
  styles: [`
    .done {
      color: #5cb85c;
      vertical-align: middle;
    }
  `],
})
export class DeleteMachineSnackbarComponent {}
