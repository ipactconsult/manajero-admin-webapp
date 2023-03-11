import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Transaction} from "../../../financial-management/models/Transaction";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };
  constructor(private httpclient:HttpClient) { }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.httpclient.post<Transaction>(`${environment.financeUrl}createTransaction/ `, transaction,this.httpOptions);
  }
   getAllTransactions () : Observable<Transaction[]> {
    return this.httpclient.get<Transaction[]>(`${environment.financeUrl}retrieveAllTransactions`);
  }
}
