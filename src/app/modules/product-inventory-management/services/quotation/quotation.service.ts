import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Quotation} from "../../models/quotation/quotation";

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllQuotations(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/quotation/all`, this.httpOptions);
  }
  
  getAllQuotationsASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/quotation/all/asc`, this.httpOptions);
  }
  
  getAllQuotationsDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/quotation/all/desc`, this.httpOptions);
  }

  getOneQuotation(quotationId: String): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/quotation/show/${quotationId}`, this.httpOptions);
  }

  addNewQuotation(quotation: Quotation): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/quotation/create`, quotation, this.httpOptions);
  }

  archiveQuotation(quotationId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/quotation/archive/${quotationId}`, this.httpOptions);
  }
  
  restoreQuotation(quotationId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/quotation/restore/${quotationId}`, this.httpOptions);
  }
  
  deleteQuotation(quotationId): Observable<any> {
    return this.httpClient.delete(`${environment.stockUrl}/quotation/delete/${quotationId}`, this.httpOptions);
  }
  
}
