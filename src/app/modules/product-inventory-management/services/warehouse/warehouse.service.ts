import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Supplier} from "../../models/supplier/supplier";
import {Warehouse} from "../../models/warehouse/warehouse";

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllWarehouses(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/warehouse/all`, this.httpOptions);
  }
  
  getAllWarehousesASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/warehouse/all/asc`, this.httpOptions);
  }
  
  getAllWarehousesDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/warehouse/all/desc`, this.httpOptions);
  }

  getOneWarehouse(warehouseId): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/warehouse/show/${warehouseId}`, this.httpOptions);
  }
  
  addNewWarehouse(warehouse: Warehouse): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/warehouse/create`, warehouse, this.httpOptions);
  }
  
  archiveWarehouse(warehouseId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/warehouse/archive/${warehouseId}`, this.httpOptions);
  }
  
  restoreWarehouse(warehouseId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/warehouse/restore/${warehouseId}`, this.httpOptions);
  }
  
}
