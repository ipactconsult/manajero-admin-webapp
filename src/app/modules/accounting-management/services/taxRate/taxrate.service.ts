import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { taxrate } from '../../models/taxrate';
import {environment} from "../../../../../environments/environment"
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class TaxrateService {

  constructor(private http: HttpClient) { }

  addTaxRate(data : taxrate){
    return this.http.post(`${environment.accountingUrl}Tax/add`, data);
  }
  putTaxRate(data : taxrate){
    return this.http.put(`${environment.accountingUrl}Tax/Put`, data);
  }

  getAll() {
    return this.http.get(`${environment.accountingUrl}Tax/taxrates`);
  }
  delete(id: string): Observable<string>{
    const url = `${environment.accountingUrl}Tax/delete/` + id;
    // @ts-ignore
   return this.http.delete<string>(url);
  }
}
