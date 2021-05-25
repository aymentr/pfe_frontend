import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authservice: AuthService) { 
    this.loginForm= this.fb.group({
      email: ['', [Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  erreur= '';

  submit(){
    this.erreur='';
    console.log(this.loginForm.value)
    this.authservice.connect(this.loginForm.value).subscribe((res: any)=>{
      if(res.token){
        this.authservice.setUser(res.token);
      }
    }, err=>{
      this.erreur=err.error.message;
    });
  }

}
