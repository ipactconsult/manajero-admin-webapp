import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {InvoiceItem} from "../../models/invoice-item.model";


@Injectable({
  providedIn: 'root'
})
export class InvoiceItemService {

  constructor(private http: HttpClient) { }

  getByInvoice(id: string){
    return this.http.get (`${environment.accountingUrl}invoiceitem/invoiceItems/`+ id);
  }

  addInvoice(invoiceItems: InvoiceItem){
    return this.http.post<InvoiceItem>(`${environment.accountingUrl}invoiceitem/add`, invoiceItems);
  }
}
