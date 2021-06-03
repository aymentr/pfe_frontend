import { Component } from '@angular/core';
import { AuthService } from './services/api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sideBarOpen = true;
  connected= true;
  isAdmin= false;
  constructor(private authservice: AuthService) { 
    this.authservice.isConnected.subscribe(res=>{
      this.connected= res;
      this.isAdmin= this.authservice.user.role=="superadmin";
    });
    
  }

  ngOnInit() { }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
