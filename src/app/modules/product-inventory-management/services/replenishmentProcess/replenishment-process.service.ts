import { ReplenishmentProcess } from '../../models/replenishmentProcess/replenishment-process';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReplenishmentProcessService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllRPs(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/rp/all`, this.httpOptions);
  }
  
  getOnePP(rpId): Observable<ReplenishmentProcess> {
    return this.httpClient.get<ReplenishmentProcess>(`${environment.stockUrl}/rp/${rpId}`, this.httpOptions);
  }
  
  createRP(rp: ReplenishmentProcess): Observable<ReplenishmentProcess> {
    return this.httpClient.post<ReplenishmentProcess>(`${environment.stockUrl}/rp/create`, rp, this.httpOptions);
  }

  firstEditRP(rpId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/rp/first-edit/${rpId}`, this.httpOptions);
  }

  editPRState(rp: ReplenishmentProcess, rpId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/rp/edit-pr/${rpId}`, rp, this.httpOptions);
  }

  deleteRP(rpId): Observable<any> {
    return this.httpClient.delete(`${environment.stockUrl}/rp/delete/${rpId}`, this.httpOptions);
  }

}
