import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Invoice} from "../../models/invoice.model";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<[Invoice]>{
    return this.http.get<[Invoice]>(`${environment.accountingUrl}invoice/getall`);
  }
  getInvoiceId(id: string){
    return this.http.get<Invoice>(`${environment.accountingUrl}invoice/getbyid/`+id);
  }
  addInvoice(invoice: Invoice){
    return this.http.post<Invoice>(`${environment.accountingUrl}invoice/add`, invoice);
  }
  archiveInvoice(id: string){
    return this.http.put(`${environment.accountingUrl}invoice/archive/`+id, null);
  }
}
