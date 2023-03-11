import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Release } from '../../models/Release';
import { Observable } from 'rxjs';
import { Employee } from '../../models/Employee';


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
export class ReleaseService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpclient : HttpClient) { }

    
  findAll(): Observable<[Release]> {
    return this.httpclient.get<[Release]>(`${environment.employees_hcm}release/all`);
  }

  findByEmployee(id: Employee|string): Observable<[Release]> {
    return this.httpclient.get<[Release]>(`${environment.employees_hcm}release/allByEmployee/${id}`);
  }

  findAllDraft(): Observable<[Release]> {
    return this.httpclient.get<[Release]>(`${environment.employees_hcm}release/all/draft`);
  }

  findAllASC(): Observable<[Release]> {
    return this.httpclient.get<[Release]>(`${environment.employees_hcm}release/all/asc`);
  }

  findAllDesc(): Observable<[Release]> {
    return this.httpclient.get<[Release]>(`${environment.employees_hcm}release/all/desc`);
  }

  add(release: Release, id: string)
  {
    return this.httpclient.post<Release>(`${environment.employees_hcm}release/create/`+id, release, this.httpOptions);
  }

  addDraft(release: Release, id: string)
  {
    return this.httpclient.post<Release>(`${environment.employees_hcm}release/add/draft/`+id, release, this.httpOptions);
  }

  getCounter(id: string):Observable<Release>{
    return this.httpclient.get<Release>(`${environment.employees_hcm}release/get/`+id  , this.httpOptions);
  }

  getRelease(id: string):Observable<Release>{
    return this.httpclient.get<Release>(`${environment.employees_hcm}release/get-release/`+id  , this.httpOptions);
  }

  update(release:Release,id : string): Observable<Release> {
    const path = `${environment.employees_hcm}release/update/`+id ;
    //@ts-ignore
    return this.httpclient.put<Release>(path ,release , this.httpOptions);
  }
  
  archive(release: Release, id: string): Observable<Release>{
    const path = `${environment.employees_hcm}release/archive/`+id ;
    //@ts-ignore
    return this.httpclient.put<Release>(path ,release , this.httpOptions);
  }

  restore(release: Release, id: string): Observable<Release>{
    const path = `${environment.employees_hcm}release/restore/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,release , this.httpOptions);
  }

  validate(release: Release, id: string): Observable<Release>{
    const path = `${environment.employees_hcm}release/validate-release/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,release , this.httpOptions);
  }

  rejected(release: Release, id: string): Observable<Release>{
    const path = `${environment.employees_hcm}release/reject-release/`+id ;
    //@ts-ignore
    return this.httpclient.put<LeaveRequest>(path ,release , this.httpOptions);
  }

}
