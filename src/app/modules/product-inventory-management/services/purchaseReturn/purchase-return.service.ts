import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {PurchaseReturn} from "../../models/purchaseReturn/purchase-return";

@Injectable({
  providedIn: 'root'
})
export class PurchaseReturnService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllPurchaseReturns(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/purchase-return/all`, this.httpOptions);
  }
  
  getAllPurchaseReturnsASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/purchase-return/all/asc`, this.httpOptions);
  }
  
  getAllPurchaseReturnsDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/purchase-return/all/desc`, this.httpOptions);
  }
  
  getOnePurchaseReturn(purchaseReturnId): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/purchase-return/show/${purchaseReturnId}`, this.httpOptions);
  }

  addNewPurchaseReturn(purchaseReturn: PurchaseReturn): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/purchase-return/create`, purchaseReturn, this.httpOptions);
  }
  
  archivePurchaseReturn(purchaseReturnId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/purchase-return/archive/${purchaseReturnId}`, this.httpOptions);
  }
  
  restorePurchaseReturn(purchaseReturnId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/purchase-return/restore/${purchaseReturnId}`, this.httpOptions);
  }
  
}
