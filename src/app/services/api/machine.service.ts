import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private readonly baseUrl= "http://localhost:3000/machines";

  constructor(private http: HttpClient) { }

  getMachines(id: string){
    return this.http.get(this.baseUrl+'/machinesByLine/'+id);
  }
}
