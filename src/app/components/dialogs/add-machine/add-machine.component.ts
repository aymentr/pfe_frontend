import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MachineService } from 'src/app/services/api/machine.service';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss']
})
export class AddMachineComponent implements OnInit {

  machineForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private fb : FormBuilder,
   private MachineSrv: MachineService, private _snackBar: MatSnackBar) { 
    this.machineForm= this.fb.group({
      ressource: ['', Validators.required],
      operation: ['', Validators.required],
      designation: ['', Validators.required],
      line_id: this.data
    });
  }

  ngOnInit(): void {
  }

  save(){
    this.MachineSrv.addMachine(this.machineForm.value).subscribe((res:any)=>{
      this.openSnackBar();
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(MachineSnackbarComponent, {
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
  </span> New Machine created successfully</span>`,
  styles: [`
    .done {
      color: #5cb85c;
      vertical-align: middle;
    }
  `],
})
class MachineSnackbarComponent {}