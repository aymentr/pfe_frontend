import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private readonly baseUrl= "http://localhost:3000/history";

  constructor(private http: HttpClient) { }

  getUnseenCount(){
    return this.http.get(this.baseUrl+'/unseen');
  }

  checkUseen(){
    this.http.get(this.baseUrl+'/check').subscribe((res)=>{
    });
  }

  getAll(){
    return this.http.get(this.baseUrl+'/list');
  }
}
