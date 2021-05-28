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

  updateMachine(id: string, machine: any){
    const token= localStorage.getItem('ACCESS_TOKEN');
    return this.http.put(this.baseUrl+"/updateMachine"+'/'+token+"/"+id, machine);
  }

  addMachine(machine: any){
    const token= localStorage.getItem('ACCESS_TOKEN');
    return this.http.post(this.baseUrl+"/addMachine"+'/'+token, machine);
  }

  deleteMachine(id: string){
    const token= localStorage.getItem('ACCESS_TOKEN');
    return this.http.delete(this.baseUrl+"/deleteMachine"+'/'+token+"/"+id);
  }
}
