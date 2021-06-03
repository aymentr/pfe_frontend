import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
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
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  save(){
    this.lineSrv.addLine(this.lineForm.value).subscribe((res:any)=>{
      this.openSnackBar();
    }, (err)=>{
      this.openErrorSnackBar(err.error.message);
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(LineSnackbarComponent, {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  openErrorSnackBar(msg: string) {
    this._snackBar.openFromComponent(LineErrorSnackbarComponent, {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: msg
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


@Component({
  selector: 'snack-bar-component-machine-snack',
  template: `<span><span class="material-icons done">
  warning 
  </span> {{data}}</span>`,
  styles: [`
    .done {
      color: #f0ad4e;
      vertical-align: middle;
    }
  `],
})
class LineErrorSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}