import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {Pay} from "../../models/Pay";

@Injectable({
  providedIn: 'root'
})
export class PayService {

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }

  addPay(pay: Pay, id:string)
  {
    return this.http.post<Pay>(`${environment.employees_hcm}pay/createpaysheet/${id}`, pay, this.httpOptions);
  }

  findAll(): Observable<[Pay]> {
    return this.http.get<[Pay]>(`${environment.employees_hcm}pay/all`);
  }
  
  findOne(id : string): Observable<Pay> {
    return this.http.get<Pay>(`${environment.employees_hcm}pay/paysheet/${id}`);
  }


}
