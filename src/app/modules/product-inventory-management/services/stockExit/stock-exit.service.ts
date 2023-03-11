import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {StockExit} from "../../models/stockExit/stock-exit";

@Injectable({
  providedIn: 'root'
})
export class StockExitService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllStockExits(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/stock-exit/all`, this.httpOptions);
  }
  
  getAllStockExitsASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/stock-exit/all/asc`, this.httpOptions);
  }
  
  getAllStockExitsDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/stock-exit/all/desc`, this.httpOptions);
  }
  
  addNewStockExit(stockExit: StockExit): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/stock-exit/create`, stockExit, this.httpOptions);
  }
  
  archiveStockExit(stockExitId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/stock-exit/archive/${stockExitId}`, this.httpOptions);
  }
  
  restoreStockExit(stockExitId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/stock-exit/restore/${stockExitId}`, this.httpOptions);
  }
  
}
