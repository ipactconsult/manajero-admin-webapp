import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {PurchaseRequisition} from "../../models/purchaseRequisition/purchase-requisition";

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequisitionService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllPR(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/pr/all`, this.httpOptions);
  }
  
  getAllPR_ASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/pr/all/asc`, this.httpOptions);
  }
  
  getAllPR_DESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/pr/all/desc`, this.httpOptions);
  }

  getOnePR(prId: String): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/pr/show/${prId}`, this.httpOptions);
  }

  addNewPR(pr: PurchaseRequisition): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/pr/create`, pr, this.httpOptions);
  }

  archivePR(prId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pr/archive/${prId}`, this.httpOptions);
  }
  
  restorePR(prId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/pr/restore/${prId}`, this.httpOptions);
  }
  
  deletePR(prId): Observable<any> {
    return this.httpClient.delete(`${environment.stockUrl}/pr/delete/${prId}`, this.httpOptions);
  }
  
}
