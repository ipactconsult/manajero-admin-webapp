import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {RequestForQuotation} from "../../models/requestForQuotation/request-for-quotation";

@Injectable({
  providedIn: 'root'
})
export class RequestForQuotationService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllRFQ(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/rfq/all`, this.httpOptions);
  }
  
  getAllRFQ_ASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/rfq/all/asc`, this.httpOptions);
  }
  
  getAllRFQ_DESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/rfq/all/desc`, this.httpOptions);
  }

  getOneRFQ(rfqId: String): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/rfq/show/${rfqId}`, this.httpOptions);
  }

  addNewRFQ(rfq: RequestForQuotation): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/rfq/create`, rfq, this.httpOptions);
  }

  archiveRFQ(rfqId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/rfq/archive/${rfqId}`, this.httpOptions);
  }
  
  restoreRFQ(rfqId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/rfq/restore/${rfqId}`, this.httpOptions);
  }
  
  deleteRFQ(rfqId): Observable<any> {
    return this.httpClient.delete(`${environment.stockUrl}/rfq/delete/${rfqId}`, this.httpOptions);
  }
  
}
