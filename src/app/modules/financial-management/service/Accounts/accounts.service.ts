import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json;  charset=utf-8 ',
    }),
  };

  private Url = 'https://manazelo-finance-back.herokuapp.com/account';

  constructor(private httpclient:HttpClient) {
    
    

  }
  public getAllExternalAccounts () : Observable<Object[]> {
    return this.httpclient.get<Object[]>(`${this.Url}/retrieveExternalAccounts`);
  }
  public getGlobalAccountBalance () : Observable<number> {
    return this.httpclient.get<number>(`${this.Url}/retrieveGlobalAccountBalance`);
  }
  public getBankAccountBalance () : Observable<number> {
    return this.httpclient.get<number>(`${this.Url}/retrieveBankAccountBalance`);
  }
  
}
