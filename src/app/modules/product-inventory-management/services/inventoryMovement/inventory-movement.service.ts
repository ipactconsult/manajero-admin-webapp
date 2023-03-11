import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {InventoryMovement} from "../../models/inventoryMovement/inventory-movement";

@Injectable({
  providedIn: 'root'
})
export class InventoryMovementService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllIMs(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/im/all`, this.httpOptions);
  }

  getAllIMsASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/im/all/asc`, this.httpOptions);
  }

  getAllIMsDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/im/all/desc`, this.httpOptions);
  }

  getOneIM(imId): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/im/${imId}`, this.httpOptions);
  }

  createIM(im: InventoryMovement): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/im/create`, im, this.httpOptions);
  }

  archiveIM(imId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/im/archive/${imId}`, this.httpOptions);
  }

  restoreIM(imId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/im/restore/${imId}`, this.httpOptions);
  }

  deleteIM(imId): Observable<any> {
    return this.httpClient.delete<any>(`${environment.stockUrl}/im/delete/${imId}`, this.httpOptions);
  }
}
