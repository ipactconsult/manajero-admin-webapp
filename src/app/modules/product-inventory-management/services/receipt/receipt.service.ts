import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Receipt} from "../../models/receipt/receipt";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllReceipts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/receipt/all`, this.httpOptions);
  }
  
  getAllReceiptsASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/receipt/all/asc`, this.httpOptions);
  }
  
  getAllReceiptsDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/receipt/all/desc`, this.httpOptions);
  }
  
  getOneReceipt(receiptId): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/receipt/${receiptId}`, this.httpOptions);
  }

  addNewReceipt(receipt: Receipt, ratingValue): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/receipt/create/${ratingValue}`, receipt, this.httpOptions);
  }
  
  archiveReceipt(receiptId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/receipt/archive/${receiptId}`, this.httpOptions);
  }
  
  restoreReceipt(receiptId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/receipt/restore/${receiptId}`, this.httpOptions);
  }
  
}
