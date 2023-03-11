import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Supplier} from "../../models/supplier/supplier";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllSuppliers(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/supplier/all`, this.httpOptions);
  }
  
  getAllSuppliersASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/supplier/all/asc`, this.httpOptions);
  }
  
  getAllSuppliersDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/supplier/all/desc`, this.httpOptions);
  }

  getOneSupplier(supplierId: String): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/supplier/show/${supplierId}`, this.httpOptions);
  }

  addNewSupplier(supplier: Supplier): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/supplier/create`, supplier, this.httpOptions);
  }

  updateSupplier(supplier: Supplier, supplierId: String): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/supplier/edit/${supplierId}`, supplier, this.httpOptions);
  }

  archiveSupplier(supplierId): Observable<Supplier> {
    return this.httpClient.put<Supplier>(`${environment.stockUrl}/supplier/archive/${supplierId}`, this.httpOptions);
  }
  
  restoreSupplier(supplierId): Observable<Supplier> {
    return this.httpClient.put<Supplier>(`${environment.stockUrl}/supplier/restore/${supplierId}`, this.httpOptions);
  }
  
}
