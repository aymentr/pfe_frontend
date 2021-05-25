import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private readonly baseUrl= "http://localhost:3000/lines";

  constructor(private http: HttpClient) { }

  getLines(){
    return this.http.get(this.baseUrl+'/list');
  }
}
