import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Quotation} from '../../models/Quotation';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  
   httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };
  constructor(private httpClient:HttpClient) { }
  
    getAllPendingQuotations(): Observable<[Quotation]> {
    return this.httpClient.get<[Quotation]>(`${environment.crmUrl}quotations/allPendingQuotations`);
  }
  
    getQuotations(): Observable<[Quotation]> {
    return this.httpClient.get<[Quotation]>(`${environment.crmUrl}quotations/allQuotations`);
  }
  
    demandQuotation(quotation: Quotation) {
    return this.httpClient.post<Quotation>(`${environment.crmUrl}quotations/demandQuotation`, quotation, this.httpOptions);
  }
  
   updateQuotation(quotation: Quotation): Observable<Quotation> {
    return this.httpClient.put<Quotation>(
      `${environment.crmUrl}quotations/update-quotation` , quotation, this.httpOptions);
  } 
   approveQuotation(quotation: Quotation, id:string): Observable<Quotation> {
    return this.httpClient.put<Quotation>(
      `${environment.crmUrl}quotations/update-quotation-status/`+id , quotation, this.httpOptions);
  }
    
  getQuotationById(id: string): Observable<Quotation> {
    return this.httpClient.get<Quotation>(`${environment.crmUrl}quotations/quotation-by-id/` + id);
  }
}
