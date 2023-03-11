import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {PurchaseOrder} from "../../models/purchaseOrder/purchase-order";

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllPOs(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/po/all`, this.httpOptions);
  }
  
  getAllPOsASCByCode(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/po/all/asc`, this.httpOptions);
  }
  
  getAllPOsDESCByCode(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/po/all/desc`, this.httpOptions);
  }

  getOnePO(poId: String): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/po/show/${poId}`, this.httpOptions);
  }

  addNewPO(po: PurchaseOrder): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/po/create`, po, this.httpOptions);
  }

  sendMail(poId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/po/send-mail/${poId}`, this.httpOptions);
  }
  
  archivePO(poId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/po/archive/${poId}`, this.httpOptions);
  }

  restorePO(poId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/po/restore/${poId}`, this.httpOptions);
  }

  receivePO(poId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/po/receive/${poId}`, this.httpOptions);
  }
  
  changeReceiptSupplier(poId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/po/receipt-supplier/${poId}`, this.httpOptions);
  }
  
  deletePO(poId): Observable<any> {
    return this.httpClient.delete(`${environment.stockUrl}/po/delete/${poId}`, this.httpOptions);
  }
  
}
