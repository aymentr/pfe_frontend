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

  getLine(id: string){
    return this.http.get(this.baseUrl+'/line/'+id);
  }


  addLine(line: any){
    const token= localStorage.getItem('ACCESS_TOKEN');
    return this.http.post(this.baseUrl+"/addLine"+'/'+token, line);
  }


  deleteLine(id: string){
    const token= localStorage.getItem('ACCESS_TOKEN');
    return this.http.delete(this.baseUrl+"/deleteLine"+'/'+token+"/"+id);
  }
}
