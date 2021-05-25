import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl= "http://localhost:3000/users";
  user:any;
  isConnected= new BehaviorSubject(false);

  constructor(private http: HttpClient) { 
    this.initializeUser();
  }

  connect(user: any){
    return this.http.post(this.baseUrl+"/login", user);
    /*
    localStorage.setItem('user',JSON.stringify(user));
    this.user= user;
    */
  }

  setUser(token: any){
    localStorage.setItem('ACCESS_TOKEN', token);
    var decoded: any= (jwt_decode(token));
    this.user.role= decoded.role;
    this.isConnected.next(true);
  }

  initializeUser(){
    this.user= {};
    if(localStorage.getItem('ACCESS_TOKEN')){
      var decoded: any= (jwt_decode(localStorage.getItem('ACCESS_TOKEN')||''));
      this.user.role= decoded.role;
      if(this.user.role){
        this.isConnected.next(true);
      }
    }
  }

  getRole(){
    return this.http.put(this.baseUrl+'/checkRole',{token: localStorage.getItem('ACCESS_TOKEN')});
  }

  logout(){
    localStorage.clear();
    location.reload();
  }

  
}
