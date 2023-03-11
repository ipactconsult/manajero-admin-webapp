import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json',
      
    }),
  };

  private Url = 'https://manazelo-finance-back.herokuapp.com/purchases';

  constructor(private httpclient:HttpClient) {

  }
  public retrievePendingRequests(): Observable<Object[]> {
    return this.httpclient.get<Object[]>(`${this.Url}/retrievePendingPurchaseRequests/`, this.httpOptions);
  }
  public retrievePendingQuotes(): Observable<Object[]> {
    return this.httpclient.get<Object[]>(`${this.Url}/getPendingPurchaseOrders/`, this.httpOptions);
  }
  public approveRequest(id:string): Observable<any> {
    return this.httpclient.put<any>(`${this.Url}/approvePurchaseRequest/`+id,this.httpOptions);
  }
  public rejectRequest(id:string): Observable<any> {
    return this.httpclient.put<any>(`${this.Url}/rejectPurchaseRequest/`+id,this.httpOptions);
  }
  public approveOrder(id:string): Observable<any> {
    return this.httpclient.put<any>(`${this.Url}/approvePurchaseOrder/`+id,this.httpOptions);
  }
  public rejectOrder(id:string): Observable<any> {
    return this.httpclient.put<any>(`${this.Url}/rejectPurchaseOrder/`+id,this.httpOptions);
  }

}
