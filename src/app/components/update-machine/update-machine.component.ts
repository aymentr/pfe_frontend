import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.scss']
})
export class UpdateMachineComponent implements OnInit {

  role: string;
  constructor(private auth: AuthService) { 
    this.role= this.auth.user.role;
  }

  ngOnInit(): void {
  }

}
