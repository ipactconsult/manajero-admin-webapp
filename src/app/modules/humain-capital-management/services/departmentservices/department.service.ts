import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Department } from '../../models/Department';
import { Observable } from 'rxjs';

const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }),
  'responseType': 'text as json'
};

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

   httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpclient: HttpClient) { }

  findAllDepts(): Observable<[Department]> {
    return this.httpclient.get<[Department]>(`${environment.employees_hcm}department/all`);
  }

  history(): Observable<[Department]> {
    return this.httpclient.get<[Department]>(`${environment.employees_hcm}department/history`);
  }

  addDepartment(department: Department)
  {
    return this.httpclient.post<Department>(`${environment.employees_hcm}department/create`, department, this.httpOptions);
  }
  deleteDept(department: Department | string): Observable<string>
  {
    const id = typeof department === 'string' ? department : department.id;
    const path = `${environment.employees_hcm}department/delete/`+id;
    //@ts-ignore
    return this.httpclient.delete<string>(path, httpOptionsPlain);
  }
  updateDepartment(id:string,department:Department): Observable<Department> {
    const path = `${environment.employees_hcm}department/update/`+id ;
    //@ts-ignore
    return this.httpclient.put<Department>(path ,department , this.httpOptions);
  }
  countDepts() {
    return this.httpclient.get<number>(`${environment.employees_hcm}department/count`,this.httpOptions);
  }
  
  getDepartment(id: string):Observable<Department>{
    return this.httpclient.get<Department>(`${environment.employees_hcm}department/findbyid/`+id  , this.httpOptions);
  }
  
  updateIsArchived(department: Department, id: string): Observable<Department>{
    const path = `${environment.employees_hcm}department/update-is-archived/`+id ;
    //@ts-ignore
    return this.httpclient.put<Department>(path ,department , this.httpOptions);
  }

  updateIsRestored(department: Department, id: string): Observable<Department>{
    const path = `${environment.employees_hcm}department/update-is-restored/`+id ;
    //@ts-ignore
    return this.httpclient.put<Department>(path ,department , this.httpOptions);
  }
  

}
