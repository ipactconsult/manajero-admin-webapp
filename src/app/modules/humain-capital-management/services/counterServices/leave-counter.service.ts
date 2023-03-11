import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { LeaveCounter } from '../../models/LeaveCounter';
import { Observable } from 'rxjs';


const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }),
  'responseType': 'text as json'
};

@Injectable({
  providedIn: 'root'
})

export class LeaveCounterService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpclient: HttpClient) { }

  
  findAll(): Observable<[LeaveCounter]> {
    return this.httpclient.get<[LeaveCounter]>(`${environment.employees_hcm}leave-counter/all`);
  }

  add(leave: LeaveCounter, id: string)
  {
    return this.httpclient.post<LeaveCounter>(`${environment.employees_hcm}leave-counter/create`, leave, this.httpOptions);
  }

  getCounter(id: string):Observable<LeaveCounter>{
    return this.httpclient.get<LeaveCounter>(`${environment.employees_hcm}leave-counter/get/`+id  , this.httpOptions);
  }

  update(leave:LeaveCounter,id : string): Observable<LeaveCounter> {
    const path = `${environment.employees_hcm}leave-counter/update/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveCounter>(path ,leave , this.httpOptions);
  }
  
  archive(leave: LeaveCounter, id: string): Observable<LeaveCounter>{
    const path = `${environment.employees_hcm}leave-counter/archive/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,leave , this.httpOptions);
  }

  restore(leave: LeaveCounter, id: string): Observable<LeaveCounter>{
    const path = `${environment.employees_hcm}leave-counter/restore/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,leave , this.httpOptions);
  }


}
