import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { SubDepartment } from '../../../models/SubDepartment';

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


export class SubDepartmentService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpclient: HttpClient) { }

  findAll(): Observable<[SubDepartment]>{
    return this.httpclient.get<[SubDepartment]>(`${environment.employees_hcm}subDepartment/all`);

  }

  addSubDepartment(subDepartment: SubDepartment)
  {
    return this.httpclient.post<SubDepartment>(`${environment.employees_hcm}subDepartment/create`, subDepartment, this.httpOptions);
  }

  deleteSubDepartment(subDepartment: SubDepartment | string): Observable<string>
  {
    const id = typeof subDepartment === 'string' ? subDepartment : subDepartment.id;
    const path = `${environment.employees_hcm}subDepartment/delete/`+id;
    //@ts-ignore
    return this.httpclient.delete<string>(path, httpOptionsPlain);
  }
  
  updateSubDepartment(id:string,subDepartment:SubDepartment): Observable<SubDepartment> {
    const path = `${environment.employees_hcm}subDepartment/update/`+id ;
    //@ts-ignore
    return this.httpclient.put<SubDepartment>(path ,subDepartment , this.httpOptions);
  }

  getSubDepartment(id: String):Observable<SubDepartment>{
    return this.httpclient.get<SubDepartment>(`${environment.employees_hcm}subDepartment/getSubDepartmentById/`+id, this.httpOptions);
  }


}
