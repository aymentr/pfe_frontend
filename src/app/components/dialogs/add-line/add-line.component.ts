import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LineService } from 'src/app/services/api/line.service';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.scss']
})
export class AddLineComponent implements OnInit {

  lineForm: FormGroup;

  constructor(private fb : FormBuilder, private lineSrv: LineService, private _snackBar: MatSnackBar) { 
    this.lineForm= this.fb.group({
      ressource: ['', Validators.required],
      operation: ['', Validators.required],
      designation: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  save(){
    this.lineSrv.addLine(this.lineForm.value).subscribe((res:any)=>{
      this.openSnackBar();
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(LineSnackbarComponent, {
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
  </span> New Line created successfully</span>`,
  styles: [`
    .done {
      color: #5cb85c;
      vertical-align: middle;
    }
  `],
})
class LineSnackbarComponent {}