import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {StockMovement} from "../../models/stockMovement/stock-movement";

@Injectable({
  providedIn: 'root'
})
export class StockMovementService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllSMs(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/sm/all`, this.httpOptions);
  }
  
  getAllSMsASCByCode(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/sm/all/asc`, this.httpOptions);
  }
  
  getAllSMsDESCByCode(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/sm/all/desc`, this.httpOptions);
  }

  getOneSM(smId: String): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/sm/show/${smId}`, this.httpOptions);
  }

  addNewSM(sm: StockMovement, materialId): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/sm/create/${materialId}`, sm, this.httpOptions);
  }

  archiveSM(smId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/sm/archive/${smId}`, this.httpOptions);
  }

  restoreSM(smId): Observable<any> {
    return this.httpClient.put<any>(`${environment.stockUrl}/sm/restore/${smId}`, this.httpOptions);
  }
  
}
