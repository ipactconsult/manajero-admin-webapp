import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Employee } from '../../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  url = environment.employees_hcm;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}
  findAllByProfile(profile: string): Observable<[Employee]> {
    return this.http.get<[Employee]>(`${this.url}employee/all_emps_pmp/${profile}`);
  }
  findEmployeeByEmail(email: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}employee/getbyemail/${email}`);
  }
  findAllResponsible(employee: string[]): Observable<[Employee]> {
    return this.http.post<[Employee]>(`${this.url}employee/allById`,employee,this.httpOptions);
  }
  findAllProfile(): Observable<[string]> {
    return this.http.get<[string]>(`${this.url}employee/profiles`);
  }
  findAllEmployees(): Observable<[Employee]> {
    return this.http.get<[Employee]>(`${this.url}employee/all_pmp`);
  }
}
