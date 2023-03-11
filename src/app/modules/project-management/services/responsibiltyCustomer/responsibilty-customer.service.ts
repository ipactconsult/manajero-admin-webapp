import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ResponsibilityCustomer } from '../../models/ResponsibilityCustomer';

@Injectable({
  providedIn: 'root'
})
export class ResponsibiltyCustomerService {
  pmoUrl =environment.pmo;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { 



  }
  findAllResponsibilityCustomerByProjectCharter(id:string): Observable<[ResponsibilityCustomer]> {
    return this.http.get<[ResponsibilityCustomer]>(`${this.pmoUrl}responsibilityCustomer/allResponsibilityCustomerByProjectCharter/${id}`);
  }
  addResponsibilityCustomer(responsibilityCustomer: ResponsibilityCustomer): Observable<ResponsibilityCustomer> {
    return this.http.post<ResponsibilityCustomer>(`${this.pmoUrl}responsibilityCustomer/addResponsibilityCustomer`,responsibilityCustomer,this.httpOptions);
  }
  updateResponsibilityCustomer(responsibilityCustomer: ResponsibilityCustomer): Observable<ResponsibilityCustomer> {
    return this.http.put<ResponsibilityCustomer>(`${this.pmoUrl}responsibilityCustomer/updateResponsibilityCustomer`,responsibilityCustomer,this.httpOptions);
  }
  deleteResponsibilityCustomer(id: string): Observable<ResponsibilityCustomer> {
    return this.http.delete<ResponsibilityCustomer>(`${this.pmoUrl}responsibilityCustomer/deleteResponsibilityCustomer/${id}`);
  }
}
