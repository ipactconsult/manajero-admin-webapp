import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {StockEntry} from "../../models/stockEntry/stock-entry";

@Injectable({
  providedIn: 'root'
})
export class StockEntryService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  getAllStockEntries(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/stock-entry/all`, this.httpOptions);
  }
  
  getAllStockEntriesASC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/stock-entry/all/asc`, this.httpOptions);
  }
  
  getAllStockEntriesDESC(): Observable<any> {
    return this.httpClient.get<any>(`${environment.stockUrl}/stock-entry/all/desc`, this.httpOptions);
  }
  
  addNewStockEntry(stockEntry: StockEntry): Observable<any> {
    return this.httpClient.post<any>(`${environment.stockUrl}/stock-entry/create`, stockEntry, this.httpOptions);
  }
  
  archiveStockEntry(stockEntryId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/stock-entry/archive/${stockEntryId}`, this.httpOptions);
  }
  
  restoreStockEntry(stockEntryId): Observable<any> {
    return this.httpClient.put(`${environment.stockUrl}/stock-entry/restore/${stockEntryId}`, this.httpOptions);
  }
  
}
